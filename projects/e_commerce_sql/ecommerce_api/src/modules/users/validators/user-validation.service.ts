import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class UserValidationService {
  validateUserStatus(status: string): void {
    switch (status) {
      case 'pending_verification':
        throw new ForbiddenException(
          'Please verify your email before logging in.',
        );
      case 'inactive':
        throw new ForbiddenException(
          'Your account is inactive. Please contact support to reactivate it.',
        );
      case 'suspended':
        throw new ForbiddenException(
          'Your account has been suspended. Please contact support.',
        );
      case 'banned':
        throw new ForbiddenException(
          'Your account has been permanently banned.',
        );
      case 'deleted':
        throw new NotFoundException('Account not found.');
    }
  }
}
