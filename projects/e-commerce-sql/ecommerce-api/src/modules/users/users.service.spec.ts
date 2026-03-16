import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseSync } from 'node:sqlite';
import * as path from 'path';
import { UsersService } from './users.service';
import { DatabaseService } from '../../../database/database.service';

// ─── HELPER ───────────────────────────────────────────────────────────────────

function buildDatabaseService(db: DatabaseSync): DatabaseService {
  return { getDb: () => db } as unknown as DatabaseService;
}

// ─── SCHEMA ───────────────────────────────────────────────────────────────────

const SCHEMA = `
  CREATE TABLE IF NOT EXISTS users (
    id            TEXT PRIMARY KEY,
    email         TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    status        TEXT NOT NULL DEFAULT 'active',
    is_deleted    INTEGER NOT NULL DEFAULT 0,
    deleted_at    TEXT,
    created_by    TEXT,
    created_at    TEXT NOT NULL,
    updated_at    TEXT,
    CHECK (status IN ('active', 'inactive', 'suspended', 'banned', 'pending_verification', 'deleted'))
  );
  
  CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email_active
  ON users (email) WHERE is_deleted = 0;

  CREATE TABLE IF NOT EXISTS roles (
    id          TEXT PRIMARY KEY,
    name        TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at  TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS permissions (
    id          TEXT PRIMARY KEY,
    name        TEXT NOT NULL UNIQUE,
    module      TEXT NOT NULL,
    action      TEXT NOT NULL,
    description TEXT,
    created_at  TEXT NOT NULL,
    UNIQUE (module, action)
  );

  CREATE TABLE IF NOT EXISTS role_permissions (
    role_id       TEXT NOT NULL REFERENCES roles(id),
    permission_id TEXT NOT NULL REFERENCES permissions(id),
    created_at    TEXT NOT NULL DEFAULT (datetime('now')),
    PRIMARY KEY (role_id, permission_id)
  );

  CREATE TABLE IF NOT EXISTS user_roles (
    user_id    TEXT NOT NULL REFERENCES users(id),
    role_id    TEXT NOT NULL REFERENCES roles(id),
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    PRIMARY KEY (user_id, role_id)
  );

  CREATE TABLE IF NOT EXISTS refresh_tokens (
    id          TEXT PRIMARY KEY,
    user_id     TEXT NOT NULL REFERENCES users(id),
    token       TEXT NOT NULL UNIQUE,
    is_used     INTEGER NOT NULL DEFAULT 0,
    expires_at  TEXT NOT NULL,
    device_type TEXT,
    user_agent  TEXT,
    created_at  TEXT NOT NULL
  );
`;

// ─── FIXTURES ─────────────────────────────────────────────────────────────────

const FIXTURES = {
  // Has testRole assigned — used for read, conflict and findUserForLogin tests
  activeUser: {
    email: 'active@test.com',
    password: 'password123',
  },
  // Used for email conflict detection only
  secondUser: {
    email: 'second@test.com',
    password: 'password123',
  },
  // Pre soft-deleted — tests is_deleted = 1 behaviour
  softDeletedUser: {
    email: 'deleted@test.com',
    password: 'password123',
  },
  // Dedicated to delete tests — no other test touches this user
  userToDelete: {
    email: 'to-delete@test.com',
    password: 'password123',
  },
  // Dedicated to update tests — no other test touches this user
  userToUpdate: {
    email: 'to-update@test.com',
    password: 'password123',
  },
  // No role assigned — tests empty permissions array on login
  userWithNoRole: {
    email: 'no-role@test.com',
    password: 'password123',
  },
  // Test-only RBAC data — fully isolated from real seed permissions
  role: {
    id: 'test-role-id',
    name: 'testRole',
    description: 'Test role',
  },
  permissions: [
    {
      id: 'test-perm-read-id',
      name: 'test:read',
      module: 'test',
      action: 'read',
    },
    {
      id: 'test-perm-write-id',
      name: 'test:write',
      module: 'test',
      action: 'write',
    },
  ],
};

// ─── SUITE ────────────────────────────────────────────────────────────────────

describe('UsersService', () => {
  let db: DatabaseSync;
  let service: UsersService;

  // ─── SETUP ──────────────────────────────────────────────────────────────────

  beforeAll(() => {
    const dbName = process.env.DB_NAME;
    if (!dbName) throw new Error('DB_NAME is not defined in .env.test');

    const dbPath = path.join(process.cwd(), 'database', dbName);
    db = new DatabaseSync(dbPath);
    db.exec('PRAGMA foreign_keys = ON;');
    db.exec(SCHEMA);

    service = new UsersService(buildDatabaseService(db));
  });

  beforeEach(async () => {
    const now = new Date().toISOString();

    // ── Users ────────────────────────────────────────────────────────────────
    await service.createUser(
      FIXTURES.activeUser.email,
      FIXTURES.activeUser.password,
    );
    await service.createUser(
      FIXTURES.secondUser.email,
      FIXTURES.secondUser.password,
    );
    await service.createUser(
      FIXTURES.userToDelete.email,
      FIXTURES.userToDelete.password,
    );
    await service.createUser(
      FIXTURES.userToUpdate.email,
      FIXTURES.userToUpdate.password,
    );
    await service.createUser(
      FIXTURES.userWithNoRole.email,
      FIXTURES.userWithNoRole.password,
    );

    // Soft deleted user — created then immediately marked deleted
    await service.createUser(
      FIXTURES.softDeletedUser.email,
      FIXTURES.softDeletedUser.password,
    );
    const softDeleted = db
      .prepare(`SELECT id FROM users WHERE email = ?`)
      .get(FIXTURES.softDeletedUser.email) as { id: string };
    db.prepare(
      `UPDATE users SET is_deleted = 1, deleted_at = ? WHERE id = ?`,
    ).run(now, softDeleted.id);

    // ── RBAC — test-only role and permissions ────────────────────────────────
    db.prepare(
      `INSERT INTO roles (id, name, description, created_at) VALUES (?, ?, ?, ?)`,
    ).run(FIXTURES.role.id, FIXTURES.role.name, FIXTURES.role.description, now);

    for (const perm of FIXTURES.permissions) {
      db.prepare(
        `INSERT INTO permissions (id, name, module, action, created_at) VALUES (?, ?, ?, ?, ?)`,
      ).run(perm.id, perm.name, perm.module, perm.action, now);

      db.prepare(
        `INSERT INTO role_permissions (role_id, permission_id, created_at) VALUES (?, ?, ?)`,
      ).run(FIXTURES.role.id, perm.id, now);
    }

    // ── Assign testRole to activeUser only ───────────────────────────────────
    const activeUser = db
      .prepare(`SELECT id FROM users WHERE email = ?`)
      .get(FIXTURES.activeUser.email) as { id: string };

    db.prepare(
      `INSERT INTO user_roles (user_id, role_id, created_at) VALUES (?, ?, ?)`,
    ).run(activeUser.id, FIXTURES.role.id, now);
  });

  afterEach(() => {
    // Child tables first to respect FK constraints
    db.exec(`
      DELETE FROM user_roles;
      DELETE FROM role_permissions;
      DELETE FROM refresh_tokens;
      DELETE FROM permissions;
      DELETE FROM roles;
      DELETE FROM users;
    `);
  });

  afterAll(() => {
    db.exec(`
      DROP TABLE IF EXISTS user_roles;
      DROP TABLE IF EXISTS role_permissions;
      DROP TABLE IF EXISTS refresh_tokens;
      DROP TABLE IF EXISTS permissions;
      DROP TABLE IF EXISTS roles;
      DROP TABLE IF EXISTS users;
    `);
    db.close();
  });

  // ─── createUser ─────────────────────────────────────────────────────────────

  describe('createUser', () => {
    it('should throw ConflictException when email differs only in case', async () => {
      await expect(
        service.createUser(
          FIXTURES.activeUser.email.toUpperCase(),
          'password123',
        ),
      ).rejects.toThrow(ConflictException);
    });

    it('should create a user and return correct fields', async () => {
      const result = await service.createUser('new@test.com', 'password123');

      expect(result.data).toMatchObject({
        email: 'new@test.com',
        status: 'active',
      });
      expect(result.data?.id).toBeDefined();
      expect(result.data?.created_at).toBeDefined();
    });

    it('should throw ConflictException if email already exists', async () => {
      await expect(
        service.createUser(FIXTURES.activeUser.email, 'password123'),
      ).rejects.toThrow(ConflictException);
    });

    it('should allow registration with the email of a soft deleted user', async () => {
      const result = await service.createUser(
        FIXTURES.softDeletedUser.email,
        'password123',
      );
      expect(result.data?.email).toBe(FIXTURES.softDeletedUser.email);
    });

    it('should store password as a bcrypt hash, not plain text', () => {
      const raw = db
        .prepare(
          `SELECT password_hash FROM users WHERE email = ? AND is_deleted = 0`,
        )
        .get(FIXTURES.activeUser.email) as { password_hash: string };

      expect(raw.password_hash).not.toBe(FIXTURES.activeUser.password);
      expect(raw.password_hash).toMatch(/^\$2[ab]\$\d+\$/);
    });

    it('should store createdBy when provided', async () => {
      const creator = db
        .prepare(`SELECT id FROM users WHERE email = ?`)
        .get(FIXTURES.activeUser.email) as { id: string };

      await service.createUser('staff@test.com', 'password123', creator.id);

      const created = db
        .prepare(`SELECT created_by FROM users WHERE email = ?`)
        .get('staff@test.com') as { created_by: string };

      expect(created.created_by).toBe(creator.id);
    });
  });

  // ─── findAll ────────────────────────────────────────────────────────────────

  describe('findAll', () => {
    it('should return all non-deleted users', () => {
      const result = service.findAll();
      const emails = (result.data as { email: string }[]).map((u) => u.email);

      expect(emails).toContain(FIXTURES.activeUser.email);
      expect(emails).toContain(FIXTURES.secondUser.email);
      expect(emails).toContain(FIXTURES.userWithNoRole.email);
    });

    it('should not return soft deleted users', () => {
      const result = service.findAll();
      const emails = (result.data as { email: string }[]).map((u) => u.email);

      expect(emails).not.toContain(FIXTURES.softDeletedUser.email);
    });
  });

  // ─── findById ───────────────────────────────────────────────────────────────

  describe('findById', () => {
    it('should return the correct user by id', () => {
      const raw = db
        .prepare(`SELECT id FROM users WHERE email = ?`)
        .get(FIXTURES.activeUser.email) as { id: string };

      const result = service.findById(raw.id);

      expect((result.data as { email: string }).email).toBe(
        FIXTURES.activeUser.email,
      );
    });

    it('should throw NotFoundException for a non-existent id', () => {
      expect(() => service.findById('non-existent-id')).toThrow(
        NotFoundException,
      );
    });

    it('should throw NotFoundException for a soft deleted user', () => {
      const raw = db
        .prepare(`SELECT id FROM users WHERE email = ?`)
        .get(FIXTURES.softDeletedUser.email) as { id: string };

      expect(() => service.findById(raw.id)).toThrow(NotFoundException);
    });
  });

  // ─── updateUser ─────────────────────────────────────────────────────────────

  describe('updateUser', () => {
    it('should reflect deletion if user is soft deleted after findById but before UPDATE completes', () => {
      const raw = db
        .prepare(`SELECT id FROM users WHERE email = ?`)
        .get(FIXTURES.userToUpdate.email) as { id: string };

      // Simulate race: soft delete the user directly on the DB mid-operation
      db.prepare(
        `UPDATE users SET is_deleted = 1, deleted_at = ?, updated_at = ? WHERE id = ?`,
      ).run(new Date().toISOString(), new Date().toISOString(), raw.id);

      // updateUser calls findById first — that will now throw
      expect(() =>
        service.updateUser(raw.id, { email: 'raced@test.com' }),
      ).toThrow(NotFoundException);
    });

    it('should update email successfully', () => {
      const raw = db
        .prepare(`SELECT id FROM users WHERE email = ?`)
        .get(FIXTURES.userToUpdate.email) as { id: string };

      const result = service.updateUser(raw.id, { email: 'updated@test.com' });

      expect((result.data as { email: string }).email).toBe('updated@test.com');
    });

    it('should update status successfully', () => {
      const raw = db
        .prepare(`SELECT id FROM users WHERE email = ?`)
        .get(FIXTURES.userToUpdate.email) as { id: string };

      const result = service.updateUser(raw.id, { status: 'inactive' });

      expect((result.data as { status: string }).status).toBe('inactive');
    });

    it('should throw ConflictException if new email belongs to another user', () => {
      const raw = db
        .prepare(`SELECT id FROM users WHERE email = ?`)
        .get(FIXTURES.userToUpdate.email) as { id: string };

      expect(() =>
        service.updateUser(raw.id, { email: FIXTURES.activeUser.email }),
      ).toThrow(ConflictException);
    });

    it('should NOT throw ConflictException when updating with own current email', () => {
      const raw = db
        .prepare(`SELECT id FROM users WHERE email = ?`)
        .get(FIXTURES.userToUpdate.email) as { id: string };

      expect(() =>
        service.updateUser(raw.id, { email: FIXTURES.userToUpdate.email }),
      ).not.toThrow();
    });

    it('should throw BadRequestException if no fields are provided', () => {
      const raw = db
        .prepare(`SELECT id FROM users WHERE email = ?`)
        .get(FIXTURES.userToUpdate.email) as { id: string };

      expect(() => service.updateUser(raw.id, {})).toThrow(BadRequestException);
    });

    it('should throw NotFoundException if user does not exist', () => {
      expect(() =>
        service.updateUser('non-existent-id', { email: 'x@test.com' }),
      ).toThrow(NotFoundException);
    });
  });

  // ─── deleteUser ─────────────────────────────────────────────────────────────

  describe('deleteUser', () => {
    it('should soft delete — sets is_deleted, deleted_at and updated_at', () => {
      const raw = db
        .prepare(`SELECT id FROM users WHERE email = ?`)
        .get(FIXTURES.userToDelete.email) as { id: string };

      service.deleteUser(raw.id);

      const deleted = db
        .prepare(
          `SELECT is_deleted, deleted_at, updated_at FROM users WHERE id = ?`,
        )
        .get(raw.id) as {
        is_deleted: number;
        deleted_at: string;
        updated_at: string;
      };

      expect(deleted.is_deleted).toBe(1);
      expect(deleted.deleted_at).toBeDefined();
      expect(deleted.updated_at).toBeDefined();
    });

    it('should not appear in findAll or findById after deletion', () => {
      const raw = db
        .prepare(`SELECT id FROM users WHERE email = ?`)
        .get(FIXTURES.userToDelete.email) as { id: string };

      service.deleteUser(raw.id);

      const allEmails = (service.findAll().data as { email: string }[]).map(
        (u) => u.email,
      );

      expect(allEmails).not.toContain(FIXTURES.userToDelete.email);
      expect(() => service.findById(raw.id)).toThrow(NotFoundException);
    });

    it('should throw NotFoundException if user does not exist', () => {
      expect(() => service.deleteUser('non-existent-id')).toThrow(
        NotFoundException,
      );
    });
  });

  // ─── findUserForLogin ────────────────────────────────────────────────────────

  describe('findUserForLogin', () => {
    it('should return each permission once even if granted via two roles', () => {
      const now = new Date().toISOString();
      // Create a second role with one overlapping permission (test:read)
      db.prepare(
        `INSERT INTO roles (id, name, description, created_at) VALUES (?, ?, ?, ?)`,
      ).run('test-role-2-id', 'testRole2', 'Second test role', now);

      db.prepare(
        `INSERT INTO role_permissions (role_id, permission_id, created_at) VALUES (?, ?, ?)`,
      ).run('test-role-2-id', 'test-perm-read-id', now);

      const activeUser = db
        .prepare(`SELECT id FROM users WHERE email = ?`)
        .get(FIXTURES.activeUser.email) as { id: string };

      db.prepare(
        `INSERT INTO user_roles (user_id, role_id, created_at) VALUES (?, ?, ?)`,
      ).run(activeUser.id, 'test-role-2-id', now);

      const result = service.findUserForLogin(FIXTURES.activeUser.email);

      const readCount = result?.permissions.filter(
        (p) => p === 'test:read',
      ).length;
      expect(readCount).toBe(1);
      expect(result?.permissions).toHaveLength(2);
    });

    it('should return user with correct permissions from assigned role', () => {
      const result = service.findUserForLogin(FIXTURES.activeUser.email);

      expect(result).toBeDefined();
      expect(result?.email).toBe(FIXTURES.activeUser.email);
      expect(result?.permissions).toEqual(
        expect.arrayContaining(['test:read', 'test:write']),
      );
      expect(result?.permissions).toHaveLength(2);
    });

    it('should return user with empty permissions array if no role assigned', () => {
      const result = service.findUserForLogin(FIXTURES.userWithNoRole.email);

      expect(result).toBeDefined();
      expect(result?.permissions).toEqual([]);
    });

    it('should return undefined for a non-existent email', () => {
      const result = service.findUserForLogin('ghost@test.com');
      expect(result).toBeUndefined();
    });

    it('should return undefined for a soft deleted user', () => {
      const result = service.findUserForLogin(FIXTURES.softDeletedUser.email);
      expect(result).toBeUndefined();
    });

    it('should return password_hash so auth service can compare passwords', () => {
      const result = service.findUserForLogin(FIXTURES.activeUser.email);

      expect(result?.password_hash).toBeDefined();
      expect(result?.password_hash).toMatch(/^\$2[ab]\$\d+\$/);
    });
  });
});
