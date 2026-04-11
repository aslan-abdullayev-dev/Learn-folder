import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseSync } from 'node:sqlite';
import { ApiResponse } from '../../core/responses/api-response';
import {
  RawUserWithPassword,
  UserWithPassword,
} from '../auth/types/auth.types';
import { DatabaseService } from '../../../database/database.service';

@Injectable()
export class UsersService {
  private readonly db: DatabaseSync;
  private readonly USER_FIELDS = 'id, email, status, created_at, updated_at';

  constructor(private readonly databaseService: DatabaseService) {
    this.db = databaseService.getDb();
  }

  // ─── CREATE ───────────────────────────────────────────────

  async createUser(email: string, password: string, createdBy?: string) {
    const normalizedEmail = email.toLowerCase();
    const existing = this.findByEmail(normalizedEmail);

    if (existing) {
      throw new ConflictException('Email already in use');
    }

    const id = uuidv4();
    const passwordHash = await bcrypt.hash(password, 10);
    const now = new Date().toISOString();

    this.db
      .prepare(
        `
  INSERT INTO users (id, email, password_hash, status, is_deleted, created_by, created_at)
  VALUES (?, ?, ?, 'active', 0, ?, ?)
`,
      )
      .run(id, normalizedEmail, passwordHash, createdBy ?? null, now);

    return new ApiResponse('User created successfully', {
      id,
      email: normalizedEmail,
      status: 'active',
      created_at: now,
    });
  }

  // ─── READ ─────────────────────────────────────────────────

  findAll() {
    return new ApiResponse(
      'Users retrieved successfully',
      this.db
        .prepare(`SELECT ${this.USER_FIELDS} FROM users WHERE is_deleted = 0`)
        .all(),
    );
  }

  findById(id: string) {
    const user = this.db
      .prepare(
        `SELECT ${this.USER_FIELDS} FROM users WHERE id = ? AND is_deleted = 0`,
      )
      .get(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return new ApiResponse('User retrieved successfully', user);
  }

  // ─── UPDATE ───────────────────────────────────────────────

  updateUser(id: string, dto: UpdateUserDto) {
    this.findById(id);

    const now = new Date().toISOString();

    const fields: string[] = [];
    const values: (string | number)[] = [];

    if (dto.email) {
      const normalizedEmail = dto.email.toLowerCase();
      if (this.findByEmail(normalizedEmail, id)) {
        throw new ConflictException('Email already in use');
      }
      fields.push('email = ?');
      values.push(normalizedEmail);
    }

    if (dto.status) {
      fields.push('status = ?');
      values.push(dto.status);
    }

    if (fields.length === 0) {
      throw new BadRequestException('No fields to update');
    }

    fields.push('updated_at = ?');
    values.push(now);
    values.push(id);

    this.db
      .prepare(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`)
      .run(...values);
    return new ApiResponse('User updated successfully', this.findById(id).data);
  }

  // ─── DELETE ───────────────────────────────────────────────

  deleteUser(id: string) {
    this.findById(id);

    const now = new Date().toISOString();

    this.db
      .prepare(
        'UPDATE users SET is_deleted = 1, deleted_at = ?, updated_at = ? WHERE id = ?',
      )
      .run(now, now, id);

    return new ApiResponse('User deleted successfully');
  }

  findByEmail(email: string, excludeId?: string) {
    if (excludeId) {
      return this.db
        .prepare(
          `SELECT ${this.USER_FIELDS} FROM users WHERE email = ? AND is_deleted = 0 AND id != ?`,
        )
        .get(email, excludeId);
    }

    return this.db
      .prepare(
        `SELECT ${this.USER_FIELDS} FROM users WHERE email = ? AND is_deleted = 0`,
      )
      .get(email);
  }

  private mapToUserWithPassword(raw: RawUserWithPassword): UserWithPassword {
    return {
      id: raw.id,
      email: raw.email,
      password_hash: raw.password_hash,
      status: raw.status,
      permissions: raw.permissions ? raw.permissions.split(',') : [],
    };
  }

  findUserForLogin(email: string): UserWithPassword | undefined {
    const raw = this.db
      .prepare(
        `SELECT
        u.id,
        u.email,
        u.password_hash,
        u.status,
        GROUP_CONCAT(DISTINCT p.name) AS permissions
       FROM users u
       LEFT JOIN user_roles ur ON u.id = ur.user_id
       LEFT JOIN roles r ON ur.role_id = r.id
       LEFT JOIN role_permissions rp ON r.id = rp.role_id
       LEFT JOIN permissions p ON rp.permission_id = p.id
       WHERE u.email = ?
         AND u.is_deleted = 0
       GROUP BY u.id, u.email, u.password_hash, u.status`,
      )
      .get(email) as RawUserWithPassword | undefined;

    if (!raw) return undefined;

    return this.mapToUserWithPassword(raw);
  }
}
