import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseSync } from 'node:sqlite';
import { ApiResponse } from '../common/responses/api-response';

@Injectable()
export class UsersService {
  private readonly db: DatabaseSync;
  private readonly USER_FIELDS = 'id, email, status, created_at, updated_at';

  constructor(private readonly databaseService: DatabaseService) {
    this.db = databaseService.getDb();
  }

  // ─── CREATE ───────────────────────────────────────────────

  async createUser(email: string, password: string, createdBy?: string) {
    const existing = this.findByEmail(email);

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
      .run(id, email, passwordHash, createdBy ?? null, now);

    return new ApiResponse('User created successfully', {
      id,
      email,
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
      if (this.findByEmail(dto.email)) {
        throw new ConflictException('Email already in use');
      }
      fields.push('email = ?');
      values.push(dto.email);
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

  // ─── PRIVATE HELPERS ──────────────────────────────────────

  private findByEmail(email: string) {
    return this.db
      .prepare('SELECT id FROM users WHERE email = ? AND is_deleted = 0')
      .get(email);
  }
}
