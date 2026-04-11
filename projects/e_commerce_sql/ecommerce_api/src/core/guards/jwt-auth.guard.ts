import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );
    if (isPublic) return true;
    return super.canActivate(context);
  }

  handleRequest<TUser>(err: Error, user: TUser, info: Error): TUser {
    if (info instanceof TokenExpiredError) {
      throw new UnauthorizedException('TOKEN_EXPIRED');
    }
    if (err || !user || info instanceof JsonWebTokenError) {
      throw new UnauthorizedException('UNAUTHORIZED');
    }
    return user;
  }
}
