import { Body, Controller, Headers, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TokenService } from './modules/token/token.service';
import { LoginDto } from './dto/login.dto';
import { UpdateAccessTokenDto } from './dto/update-access-token.dto';
import { IsPublic } from '../../core/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

  @IsPublic()
  @Post('login')
  async login(
    @Body() body: LoginDto,
    @Headers('user-agent') userAgent: string,
  ) {
    return this.authService.login(body.email, body.password, userAgent);
  }

  @IsPublic()
  @Post('update-access-token')
  updateAccessToken(
    @Body() body: UpdateAccessTokenDto,
    @Headers('user-agent') userAgent: string,
  ) {
    return this.tokenService.updateAccessToken(body.refreshToken, userAgent);
  }
}
