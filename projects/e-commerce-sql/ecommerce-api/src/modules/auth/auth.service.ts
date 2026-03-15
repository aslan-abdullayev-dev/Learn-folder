import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { UserValidationService } from '../users/validators/user-validation.service';
import { TokenService } from './modules/token/token.service';
import { ApiResponse } from '../../common/responses/api-response';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly userValidationService: UserValidationService,
    private readonly tokenService: TokenService,
  ) {}

  async login(
    email: string,
    password: string,
    userAgent: string | null,
  ): Promise<ApiResponse<{ accessToken: string; refreshToken: string }>> {
    const user = this.usersService.findUserForLogin(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    this.userValidationService.validateUserStatus(user.status);

    const tokens = this.tokenService.issueTokenPair(user, userAgent);

    return new ApiResponse('User logged in successfully', tokens);
  }
}
