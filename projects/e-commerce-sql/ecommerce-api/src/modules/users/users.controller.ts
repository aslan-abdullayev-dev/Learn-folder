import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { USERS_PERMISSIONS } from './permissions/users.permissions';
import { IsPublic } from '../../core/decorators/public.decorator';
import { JwtPayload } from '../auth/jwt.strategy';
import { RequirePermission } from '../../core/decorators/require-permission.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @IsPublic()
  @Post('register')
  async register(@Body() body: RegisterUserDto) {
    return this.usersService.createUser(body.email, body.password);
  }

  @Post('register-staff')
  @RequirePermission(USERS_PERMISSIONS.CREATE)
  async registerStaff(
    @Body() body: CreateUserDto,
    @Req() req: { user: JwtPayload },
  ) {
    return this.usersService.createUser(
      body.email,
      body.password,
      req.user.sub,
    );
  }

  @Get()
  @RequirePermission(USERS_PERMISSIONS.READ)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @RequirePermission(USERS_PERMISSIONS.READ)
  findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Patch(':id')
  @RequirePermission(USERS_PERMISSIONS.UPDATE)
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.updateUser(id, body);
  }

  @Delete(':id')
  @RequirePermission(USERS_PERMISSIONS.DELETE)
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
