import { Body, Controller, Headers, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { IsPublic } from '../../core/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('login')
  async login(
    @Body() body: LoginDto,
    @Headers('user-agent') userAgent: string,
  ) {
    return this.authService.login(body.email, body.password, userAgent);
  }
}
