import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { USERS_PERMISSIONS } from './permissions/users.permissions';
import { IsPublic } from '../../common/decorators/public.decorator';

@Controller('users')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @IsPublic
  @Post('register')
  async register(@Body() body: CreateUserDto) {
    return this.usersService.createUser(
      body.email,
      body.password,
      body.createdBy,
    );
  }

  @Post('register-staff')
  @SetMetadata('permission', USERS_PERMISSIONS.CREATE)
  async registerStaff(@Body() body: CreateUserDto) {
    return this.usersService.createUser(
      body.email,
      body.password,
      body.createdBy,
    );
  }

  @Get()
  @SetMetadata('permission', USERS_PERMISSIONS.READ)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @SetMetadata('permission', USERS_PERMISSIONS.READ)
  findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Patch(':id')
  @SetMetadata('permission', USERS_PERMISSIONS.UPDATE)
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.updateUser(id, body);
  }

  @Delete(':id')
  @SetMetadata('permission', USERS_PERMISSIONS.DELETE)
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
