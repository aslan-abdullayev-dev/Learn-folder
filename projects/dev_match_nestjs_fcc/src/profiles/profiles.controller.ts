import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
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

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get()
  findAll(): FindAllProfilesResponseDto[] {
    return this.profilesService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: FindOneProfileDto): FindOneProfileResponseDto {
    return this.profilesService.findOne(params.id);
  }

  @Post()
  async create(
    @Body() data: CreateProfileDto,
  ): Promise<FindOneProfileResponseDto> {
    const newProfileId = await this.profilesService.create(data);
    return this.profilesService.findOne(newProfileId);
  }

  @Put(':id')
  async update(
    @Param() params: FindOneProfileDto,
    @Body() data: UpdateProfileDto,
  ): Promise<FindOneProfileResponseDto> {
    const updatedId = await this.profilesService.update({
      ...data,
      id: params.id,
    });
    return this.profilesService.findOne(updatedId);
  }

  @Patch(':id/status')
  async updateStatus(
    @Param() params: FindOneProfileDto,
    @Body() data: UpdateProfileStatusDto,
  ): Promise<FindOneProfileResponseDto> {
    const updatedId = await this.profilesService.updateStatus({
      id: params.id,
      status: data.status,
    });
    return this.profilesService.findOne(updatedId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param() params: FindOneProfileDto) {
    await this.profilesService.remove(params.id);
  }
}
