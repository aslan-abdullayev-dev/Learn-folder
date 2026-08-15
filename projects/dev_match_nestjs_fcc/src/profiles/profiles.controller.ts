import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProfileDto } from './dto/request/create-profile.dto';
import { FindAllProfilesResponseDto } from './dto/response/find-all-profiles-response.dto';
import { FindOneProfileDto } from './dto/request/find-one-profile.dto';
import { FindOneProfileResponseDto } from './dto/response/find-one-profile-response.dto';
import { UpdateProfileDto } from './dto/request/update-profile.dto';
import { UpdateProfileStatusDto } from './dto/request/update-profile-status.dto';
import { ProfilesService } from './services/profiles.service';
import { ApiNotFoundResponse } from '@nestjs/swagger';
import { ProfileNotFoundError } from './errors/profile-not-found.error';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get()
  findAll(): FindAllProfilesResponseDto[] {
    return this.profilesService.findAll();
  }

  @Get(':id')
  @ApiNotFoundResponse({ description: 'Profile not found' })
  findOne(@Param() params: FindOneProfileDto): FindOneProfileResponseDto {
    try {
      return this.profilesService.findOne(params.id);
    } catch (error) {
      if (error instanceof ProfileNotFoundError) throw new NotFoundException();
      throw error;
    }
  }

  @Post()
  async create(
    @Body() data: CreateProfileDto,
  ): Promise<FindOneProfileResponseDto> {
    const newProfileId = await this.profilesService.create(data);
    return this.profilesService.findOne(newProfileId);
  }

  @Put(':id')
  @ApiNotFoundResponse({ description: 'Profile not found' })
  async update(
    @Param() params: FindOneProfileDto,
    @Body() data: UpdateProfileDto,
  ): Promise<FindOneProfileResponseDto> {
    try {
      const updatedId = await this.profilesService.update({
        ...data,
        id: params.id,
      });
      return this.profilesService.findOne(updatedId);
    } catch (error) {
      if (error instanceof ProfileNotFoundError) throw new NotFoundException();
      throw error;
    }
  }

  @Patch(':id/status')
  @ApiNotFoundResponse({ description: 'Profile not found' })
  async updateStatus(
    @Param() params: FindOneProfileDto,
    @Body() data: UpdateProfileStatusDto,
  ): Promise<FindOneProfileResponseDto> {
    try {
      const updatedId = await this.profilesService.updateStatus({
        id: params.id,
        status: data.status,
      });
      return this.profilesService.findOne(updatedId);
    } catch (error) {
      if (error instanceof ProfileNotFoundError) throw new NotFoundException();
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNotFoundResponse({ description: 'Profile not found' })
  async remove(@Param() params: FindOneProfileDto) {
    try {
      await this.profilesService.remove(params.id);
    } catch (error) {
      if (error instanceof ProfileNotFoundError) throw new NotFoundException();
      throw error;
    }
  }
}
