import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { ACCESS_TOKEN_EXPIRY } from './modules/token/token.constants';
import { TokenService } from './modules/token/token.service';
import { DatabaseModule } from '../../../database/database.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: ACCESS_TOKEN_EXPIRY },
      }),
    }),
    PassportModule,
    DatabaseModule,
    UsersModule,
  ],
  providers: [JwtStrategy, AuthService, TokenService],
  exports: [JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}
