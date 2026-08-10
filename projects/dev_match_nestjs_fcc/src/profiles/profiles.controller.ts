import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateProfileDto } from './dto/request/create-profile.dto';
import { CreateProfileResponseDto } from './dto/response/create-profile-response.dto';
import { FindAllProfilesDto } from './dto/request/find-all-profiles.dto';
import { FindAllProfilesResponseDto } from './dto/response/find-all-profiles-response.dto';
import { FindOneProfileDto } from './dto/request/find-one-profile.dto';
import { FindOneProfileResponseDto } from './dto/response/find-one-profile-response.dto';
import { UpdateProfileDto } from './dto/request/update-profile.dto';
import { UpdateProfileResponseDto } from './dto/response/update-profile-response.dto';
import { UpdateProfileStatusDto } from './dto/request/update-profile-status.dto';
import { UpdateProfileStatusResponseDto } from './dto/response/update-profile-status-response.dto';

@Controller('profiles')
export class ProfilesController {
  @Get()
  findAll(@Query() query: FindAllProfilesDto): FindAllProfilesResponseDto[] {
    return [{ location: query.location }];
  }

  @Get(':id')
  findOne(@Param() params: FindOneProfileDto): FindOneProfileResponseDto {
    return { id: params.id };
  }

  @Post()
  create(@Body() data: CreateProfileDto): CreateProfileResponseDto {
    return { name: data.name, description: data.description };
  }

  @Put(':id')
  update(
    @Param() params: FindOneProfileDto,
    @Body() data: UpdateProfileDto,
  ): UpdateProfileResponseDto {
    return { id: params.id, name: data.name, description: data.description };
  }

  @Patch(':id/status')
  updateStatus(
    @Param() params: FindOneProfileDto,
    @Body() data: UpdateProfileStatusDto,
  ): UpdateProfileStatusResponseDto {
    return { id: params.id, status: data.status };
  }
}
