import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { DatabaseSync } from 'node:sqlite';
import { JwtPayload } from '../../jwt.strategy';
import { UserWithPassword } from '../../types/auth.types';
import {
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY_MS,
} from './token.constants';
import { UsersService } from '../../../users/users.service';
import { DatabaseService } from '../../../../../database/database.service';
import { ApiResponse } from '../../../../core/responses/api-response';

@Injectable()
export class TokenService {
  private readonly db: DatabaseSync;

  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly databaseService: DatabaseService,
  ) {
    this.db = databaseService.getDb();
  }

  // ─── PUBLIC ───────────────────────────────────────────────

  issueTokenPair(
    user: UserWithPassword,
    userAgent: string | null,
  ): { accessToken: string; refreshToken: string } {
    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken();

    this.storeRefreshToken(user.id, refreshToken, userAgent);

    return { accessToken, refreshToken };
  }

  updateAccessToken(
    refreshToken: string,
    userAgent: string | null,
  ): ApiResponse<{ accessToken: string; refreshToken: string }> {
    const record = this.findRefreshToken(refreshToken);

    if (!record) {
      throw new UnauthorizedException('UNAUTHORIZED');
    }

    if (record.is_used) {
      this.revokeAllUserTokens(record.user_id);
      throw new UnauthorizedException('UNAUTHORIZED');
    }

    if (new Date(record.expires_at) < new Date()) {
      throw new UnauthorizedException('TOKEN_EXPIRED');
    }

    const user = this.usersService.findUserForLogin(record.email);
    if (!user) {
      throw new UnauthorizedException('UNAUTHORIZED');
    }

    this.markTokenAsUsed(refreshToken);

    const tokens = this.issueTokenPair(user, userAgent);

    return new ApiResponse('Token refreshed successfully', tokens);
  }

  // ─── PRIVATE — TOKEN GENERATION ──────────────────────────

  private generateAccessToken(user: UserWithPassword): string {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      status: user.status,
      permissions: user.permissions,
    };

    return this.jwtService.sign(payload, { expiresIn: ACCESS_TOKEN_EXPIRY });
  }

  private generateRefreshToken(): string {
    return uuidv4();
  }

  // ─── PRIVATE — DB ─────────────────────────────────────────

  private storeRefreshToken(
    userId: string,
    token: string,
    userAgent: string | null,
  ): void {
    const expiresAt = new Date(
      Date.now() + REFRESH_TOKEN_EXPIRY_MS,
    ).toISOString();

    this.db
      .prepare(
        `INSERT INTO refresh_tokens (id, user_id, token, expires_at, device_type, user_agent, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
      )
      .run(
        uuidv4(),
        userId,
        token,
        expiresAt,
        this.getDeviceType(userAgent),
        userAgent,
        new Date().toISOString(),
      );
  }

  private findRefreshToken(token: string) {
    return this.db
      .prepare(
        `SELECT rt.token, rt.is_used, rt.expires_at, rt.user_id,
                u.email, u.status
         FROM refresh_tokens rt
         JOIN users u ON rt.user_id = u.id
         WHERE rt.token = ?
           AND u.is_deleted = 0`,
      )
      .get(token) as
      | {
          token: string;
          is_used: number;
          expires_at: string;
          user_id: string;
          email: string;
          status: string;
        }
      | undefined;
  }

  private markTokenAsUsed(token: string): void {
    this.db
      .prepare(`UPDATE refresh_tokens SET is_used = 1 WHERE token = ?`)
      .run(token);
  }

  private revokeAllUserTokens(userId: string): void {
    this.db
      .prepare(`UPDATE refresh_tokens SET is_used = 1 WHERE user_id = ?`)
      .run(userId);
  }

  private getDeviceType(userAgent: string | null): string {
    if (!userAgent) return 'unknown';
    const ua = userAgent.toLowerCase();
    if (/mobile|android|iphone|ipad|tablet/.test(ua)) return 'Mobile';
    return 'Desktop';
  }
}
