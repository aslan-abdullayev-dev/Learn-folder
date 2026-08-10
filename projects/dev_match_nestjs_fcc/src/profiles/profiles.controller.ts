import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateProfileDto } from './dto/request/create-profile.dto';
import { CreateProfileResponseDto } from './dto/response/create-profile-response.dto';
import { FindAllProfilesDto } from './dto/request/find-all-profiles.dto';
import { FindAllProfilesResponseDto } from './dto/response/find-all-profiles-response.dto';
import { FindOneProfileDto } from './dto/request/find-one-profile.dto';
import { FindOneProfileResponseDto } from './dto/response/find-one-profile-response.dto';

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
}
