import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthModule } from '../auth/auth.module';
import { UserValidationService } from './validators/user-validation.service';
import { DatabaseModule } from '../../../database/database.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => AuthModule)],
  controllers: [UsersController],
  providers: [UsersService, UserValidationService],
  exports: [UsersService, UserValidationService],
})
export class UsersModule {}
