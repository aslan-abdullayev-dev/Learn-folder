import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { JwtPayload } from '../../jwt.strategy';
import { UserWithPassword } from '../../types/auth.types';
import {
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY_MS,
} from './token.constants';
import { UsersService } from '../../../users/users.service';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  issueTokenPair(
    user: UserWithPassword,
    userAgent: string | null,
  ): { accessToken: string; refreshToken: string } {
    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken();

    this.storeRefreshToken(user.id, refreshToken, userAgent);

    return { accessToken, refreshToken };
  }

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

  private storeRefreshToken(
    userId: string,
    token: string,
    userAgent: string | null,
  ): void {
    const expiresAt = new Date(
      Date.now() + REFRESH_TOKEN_EXPIRY_MS,
    ).toISOString();

    this.usersService.saveRefreshToken({
      id: uuidv4(),
      userId,
      token,
      expiresAt,
      deviceType: this.getDeviceType(userAgent),
      userAgent,
    });
  }

  private getDeviceType(userAgent: string | null): string {
    if (!userAgent) return 'unknown';
    const ua = userAgent.toLowerCase();
    if (/mobile|android|iphone|ipad|tablet/.test(ua)) return 'Mobile';
    return 'Desktop';
  }
}
