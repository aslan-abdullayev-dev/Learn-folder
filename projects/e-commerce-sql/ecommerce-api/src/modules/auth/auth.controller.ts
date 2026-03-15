import { Body, Controller, Headers, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { PermissionsGuard } from './guards/permissions.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { IsPublic } from '../../common/decorators/public.decorator';

@Controller('auth')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic
  @Post('login')
  async login(
    @Body() body: LoginDto,
    @Headers('user-agent') userAgent: string,
  ) {
    return this.authService.login(body.email, body.password, userAgent);
  }
}
