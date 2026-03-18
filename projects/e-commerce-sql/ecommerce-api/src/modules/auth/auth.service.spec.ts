import {
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DatabaseSync } from 'node:sqlite';
import * as path from 'path';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { UserValidationService } from '../users/validators/user-validation.service';
import { TokenService } from './modules/token/token.service';
import { DatabaseService } from '../../../database/database.service';
import { ApiResponse } from '../../core/responses/api-response';

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function buildDatabaseService(db: DatabaseSync): DatabaseService {
  return { getDb: () => db } as unknown as DatabaseService;
}

function buildMockTokenService(): jest.Mocked<
  Pick<TokenService, 'issueTokenPair'>
> {
  return {
    issueTokenPair: jest.fn().mockReturnValue({
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
    }),
  };
}

// ─── SCHEMA ───────────────────────────────────────────────────────────────────

import * as fs from 'fs';
const SCHEMA = fs.readFileSync(
  path.join(process.cwd(), 'database', 'schema.sql'),
  'utf-8',
);

// ─── FIXTURES ─────────────────────────────────────────────────────────────────

const FIXTURES = {
  activeUser: {
    email: 'active@test.com',
    password: 'password123',
  },
  pendingUser: {
    email: 'pending@test.com',
    password: 'password123',
  },
  inactiveUser: {
    email: 'inactive@test.com',
    password: 'password123',
  },
  suspendedUser: {
    email: 'suspended@test.com',
    password: 'password123',
  },
  bannedUser: {
    email: 'banned@test.com',
    password: 'password123',
  },
  deletedStatusUser: {
    email: 'deletedstatus@test.com',
    password: 'password123',
  },
};

// ─── SUITE ────────────────────────────────────────────────────────────────────

describe('AuthService', () => {
  let db: DatabaseSync;
  let usersService: UsersService;
  let authService: AuthService;
  let mockTokenService: jest.Mocked<Pick<TokenService, 'issueTokenPair'>>;

  // ─── SETUP ────────────────────────────────────────────────────────────────

  beforeAll(() => {
    const dbName = process.env.DB_NAME;
    if (!dbName) throw new Error('DB_NAME is not defined in .env');

    const dbPath = path.join(process.cwd(), 'database', dbName);
    db = new DatabaseSync(dbPath);
    db.exec('PRAGMA foreign_keys = ON;');
    db.exec(SCHEMA);

    usersService = new UsersService(buildDatabaseService(db));
  });

  beforeEach(async () => {
    mockTokenService = buildMockTokenService();

    authService = new AuthService(
      usersService,
      new UserValidationService(),
      mockTokenService as unknown as TokenService,
    );

    // Active user — the standard happy path user
    await usersService.createUser(
      FIXTURES.activeUser.email,
      FIXTURES.activeUser.password,
    );

    // Users with each blocked status — created then manually set
    const blockedFixtures: Array<{
      email: string;
      password: string;
      status: string;
    }> = [
      { ...FIXTURES.pendingUser, status: 'pending_verification' },
      { ...FIXTURES.inactiveUser, status: 'inactive' },
      { ...FIXTURES.suspendedUser, status: 'suspended' },
      { ...FIXTURES.bannedUser, status: 'banned' },
      { ...FIXTURES.deletedStatusUser, status: 'deleted' },
    ];

    for (const fixture of blockedFixtures) {
      await usersService.createUser(fixture.email, fixture.password);
      db.prepare(`UPDATE users SET status = ? WHERE email = ?`).run(
        fixture.status,
        fixture.email,
      );
    }
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

  // ─── login ────────────────────────────────────────────────────────────────

  describe('login', () => {
    it('should return accessToken and refreshToken on valid credentials', async () => {
      const result = await authService.login(
        FIXTURES.activeUser.email,
        FIXTURES.activeUser.password,
        'Mozilla/5.0',
      );

      expect(result).toBeInstanceOf(ApiResponse);
      expect(result.data?.accessToken).toBe('mock-access-token');
      expect(result.data?.refreshToken).toBe('mock-refresh-token');
    });

    it('should call issueTokenPair once on successful login', async () => {
      await authService.login(
        FIXTURES.activeUser.email,
        FIXTURES.activeUser.password,
        'Mozilla/5.0',
      );

      expect(mockTokenService.issueTokenPair).toHaveBeenCalledTimes(1);
    });

    it('should throw UnauthorizedException for a non-existent email', async () => {
      await expect(
        authService.login('ghost@test.com', 'password123', null),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException for a wrong password', async () => {
      await expect(
        authService.login(FIXTURES.activeUser.email, 'wrong-password', null),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should not reveal whether the email or password was wrong', async () => {
      const wrongEmail = authService.login(
        'ghost@test.com',
        'password123',
        null,
      );
      const wrongPassword = authService.login(
        FIXTURES.activeUser.email,
        'wrong-password',
        null,
      );

      await expect(wrongEmail).rejects.toThrow('Invalid credentials');
      await expect(wrongPassword).rejects.toThrow('Invalid credentials');
    });

    it('should resolve login with uppercase email (case-insensitive)', async () => {
      const result = await authService.login(
        FIXTURES.activeUser.email.toUpperCase(),
        FIXTURES.activeUser.password,
        null,
      );

      expect(result.data?.accessToken).toBeDefined();
    });

    it('should throw ForbiddenException for pending_verification status', async () => {
      await expect(
        authService.login(
          FIXTURES.pendingUser.email,
          FIXTURES.pendingUser.password,
          null,
        ),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should throw ForbiddenException for inactive status', async () => {
      await expect(
        authService.login(
          FIXTURES.inactiveUser.email,
          FIXTURES.inactiveUser.password,
          null,
        ),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should throw ForbiddenException for suspended status', async () => {
      await expect(
        authService.login(
          FIXTURES.suspendedUser.email,
          FIXTURES.suspendedUser.password,
          null,
        ),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should throw ForbiddenException for banned status', async () => {
      await expect(
        authService.login(
          FIXTURES.bannedUser.email,
          FIXTURES.bannedUser.password,
          null,
        ),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should throw NotFoundException for deleted status', async () => {
      await expect(
        authService.login(
          FIXTURES.deletedStatusUser.email,
          FIXTURES.deletedStatusUser.password,
          null,
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('should not call issueTokenPair when credentials are invalid', async () => {
      await expect(
        authService.login('ghost@test.com', 'password123', null),
      ).rejects.toThrow(UnauthorizedException);

      expect(mockTokenService.issueTokenPair).not.toHaveBeenCalled();
    });

    it('should not call issueTokenPair when user status is blocked', async () => {
      await expect(
        authService.login(
          FIXTURES.suspendedUser.email,
          FIXTURES.suspendedUser.password,
          null,
        ),
      ).rejects.toThrow(ForbiddenException);

      expect(mockTokenService.issueTokenPair).not.toHaveBeenCalled();
    });
  });
});
