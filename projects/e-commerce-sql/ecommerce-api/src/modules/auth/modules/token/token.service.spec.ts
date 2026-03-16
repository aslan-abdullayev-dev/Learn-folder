import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseSync } from 'node:sqlite';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { TokenService } from './token.service';
import { UsersService } from '../../../users/users.service';
import { DatabaseService } from '../../../../../database/database.service';
import { ApiResponse } from '../../../../core/responses/api-response';
import { REFRESH_TOKEN_EXPIRY_MS } from './token.constants';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function buildDatabaseService(db: DatabaseSync): DatabaseService {
  return { getDb: () => db } as unknown as DatabaseService;
}

function buildJwtService(): JwtService {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is not defined in .env');
  return new JwtService({ secret, signOptions: { expiresIn: '15m' } });
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
  activeUser: {
    email: 'active@test.com',
    password: 'password123',
  },
  secondUser: {
    email: 'second@test.com',
    password: 'password123',
  },
};

// ─── SUITE ────────────────────────────────────────────────────────────────────

describe('TokenService', () => {
  let db: DatabaseSync;
  let usersService: UsersService;
  let tokenService: TokenService;
  let activeUserId: string;

  // ─── SETUP ──────────────────────────────────────────────────────────────────

  beforeAll(() => {
    const dbName = process.env.DB_NAME;
    if (!dbName) throw new Error('DB_NAME is not defined in .env');

    const dbPath = path.join(process.cwd(), 'database', dbName);
    db = new DatabaseSync(dbPath);
    db.exec('PRAGMA foreign_keys = ON;');
    db.exec(SCHEMA);

    const dbService = buildDatabaseService(db);
    usersService = new UsersService(dbService);
    tokenService = new TokenService(buildJwtService(), usersService, dbService);
  });

  beforeEach(async () => {
    await usersService.createUser(
      FIXTURES.activeUser.email,
      FIXTURES.activeUser.password,
    );
    await usersService.createUser(
      FIXTURES.secondUser.email,
      FIXTURES.secondUser.password,
    );

    const raw = db
      .prepare(`SELECT id FROM users WHERE email = ?`)
      .get(FIXTURES.activeUser.email) as { id: string };

    activeUserId = raw.id;
  });

  afterEach(() => {
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

  // ─── Helpers ──────────────────────────────────────────────────────────────

  function insertRefreshToken(
    overrides: {
      userId?: string;
      token?: string;
      isUsed?: number;
      expiresAt?: string;
    } = {},
  ): string {
    const token = overrides.token ?? 'test-refresh-token';
    const expiresAt =
      overrides.expiresAt ??
      new Date(Date.now() + REFRESH_TOKEN_EXPIRY_MS).toISOString();

    db.prepare(
      `INSERT INTO refresh_tokens (id, user_id, token, is_used, expires_at, device_type, user_agent, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    ).run(
      `token-id-${Date.now()}`,
      overrides.userId ?? activeUserId,
      token,
      overrides.isUsed ?? 0,
      expiresAt,
      'Desktop',
      'Mozilla/5.0',
      new Date().toISOString(),
    );

    return token;
  }

  // ─── updateAccessToken ────────────────────────────────────────────────────

  describe('updateAccessToken', () => {
    it('should return new accessToken and refreshToken for a valid token', () => {
      const token = insertRefreshToken();

      const result = tokenService.updateAccessToken(token, 'Mozilla/5.0');

      expect(result).toBeInstanceOf(ApiResponse);
      expect(result.data?.accessToken).toBeDefined();
      expect(result.data?.refreshToken).toBeDefined();
    });

    it('should return a real signed JWT as accessToken', () => {
      const token = insertRefreshToken();

      const result = tokenService.updateAccessToken(token, 'Mozilla/5.0');

      // A real JWT has three base64url segments separated by dots
      expect(result.data?.accessToken).toMatch(/^[\w-]+\.[\w-]+\.[\w-]+$/);
    });

    it('should return a new refreshToken that differs from the old one', () => {
      const oldToken = insertRefreshToken();

      const result = tokenService.updateAccessToken(oldToken, 'Mozilla/5.0');

      expect(result.data?.refreshToken).not.toBe(oldToken);
    });

    it('should throw UnauthorizedException for a token that does not exist', () => {
      expect(() =>
        tokenService.updateAccessToken('non-existent-token', null),
      ).toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException with UNAUTHORIZED for missing token', () => {
      expect(() =>
        tokenService.updateAccessToken('non-existent-token', null),
      ).toThrow('UNAUTHORIZED');
    });

    it('should throw UnauthorizedException when token is already used', () => {
      const token = insertRefreshToken({ isUsed: 1 });

      expect(() => tokenService.updateAccessToken(token, null)).toThrow(
        UnauthorizedException,
      );
    });

    it('should revoke ALL tokens for the user when a reused token is detected', () => {
      // Insert two valid tokens for the same user
      insertRefreshToken({ token: 'first-token' });
      insertRefreshToken({ token: 'second-token' });

      // Mark first as already used — simulates a replay attack
      const usedToken = insertRefreshToken({
        token: 'reused-token',
        isUsed: 1,
      });

      expect(() => tokenService.updateAccessToken(usedToken, null)).toThrow(
        UnauthorizedException,
      );

      // All tokens for this user should now be marked as used
      const remaining = db
        .prepare(
          `SELECT COUNT(*) as count FROM refresh_tokens
           WHERE user_id = ? AND is_used = 0`,
        )
        .get(activeUserId) as { count: number };

      expect(remaining.count).toBe(0);
    });

    it('should throw UnauthorizedException with TOKEN_EXPIRED for an expired token', () => {
      const expiredToken = insertRefreshToken({
        expiresAt: new Date(Date.now() - 1000).toISOString(),
      });

      expect(() => tokenService.updateAccessToken(expiredToken, null)).toThrow(
        'TOKEN_EXPIRED',
      );
    });

    it('should throw UnauthorizedException when user is soft deleted after token was issued', () => {
      const token = insertRefreshToken();

      // Soft delete the user after the token was issued
      db.prepare(
        `UPDATE users SET is_deleted = 1, deleted_at = ? WHERE id = ?`,
      ).run(new Date().toISOString(), activeUserId);

      expect(() => tokenService.updateAccessToken(token, null)).toThrow(
        UnauthorizedException,
      );
    });

    it('should mark the old token as used after a successful refresh', () => {
      const token = insertRefreshToken();

      tokenService.updateAccessToken(token, null);

      const record = db
        .prepare(`SELECT is_used FROM refresh_tokens WHERE token = ?`)
        .get(token) as { is_used: number };

      expect(record.is_used).toBe(1);
    });

    it('should insert a new refresh token row into the DB after a successful refresh', () => {
      const token = insertRefreshToken();

      const result = tokenService.updateAccessToken(token, null);

      if (!result.data) {
        fail('Expected result.data to be defined');
      }

      const newRecord = db
        .prepare(`SELECT id FROM refresh_tokens WHERE token = ?`)
        .get(result.data.refreshToken) as { id: string } | undefined;

      expect(newRecord).toBeDefined();
    });

    it('should pass user-agent to the new refresh token row', () => {
      const token = insertRefreshToken();
      const userAgent = 'TestAgent/1.0';

      const result = tokenService.updateAccessToken(token, userAgent);

      if (!result.data) {
        fail('Expected result.data to be defined');
      }

      const newRecord = db
        .prepare(`SELECT user_agent FROM refresh_tokens WHERE token = ?`)
        .get(result.data.refreshToken) as { user_agent: string } | undefined;

      expect(newRecord?.user_agent).toBe(userAgent);
    });

    it('should encode correct sub and email in the new accessToken payload', () => {
      const token = insertRefreshToken();
      const jwtService = buildJwtService();

      const result = tokenService.updateAccessToken(token, null);

      if (!result.data) {
        fail('Expected result.data to be defined');
      }

      const decoded = jwtService.decode(result.data.accessToken);

      if (!decoded || typeof decoded !== 'object') {
        fail('Expected decoded JWT to be an object');
      }

      expect((decoded as Record<string, unknown>)['sub']).toBe(activeUserId);
      expect((decoded as Record<string, unknown>)['email']).toBe(
        FIXTURES.activeUser.email,
      );
    });
  });
});
