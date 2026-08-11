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
import { UpdateProfileStatusResponseDto } from './dto/response/update-profile-status-response.dto';
import { ProfilesService } from './services/profiles.service';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get()
  findAll(): FindAllProfilesResponseDto[] {
    return this.profilesService.findAll();
  }

  @Get(':id')
  findOne(
    @Param() params: FindOneProfileDto,
  ): FindOneProfileResponseDto | null {
    const res = this.profilesService.findOne(params.id);
    if (!res) return null;
    return res;
  }

  @Post()
  async create(
    @Body() data: CreateProfileDto,
  ): Promise<FindOneProfileResponseDto | null> {
    const newProfileId = await this.profilesService.create(data);
    const res = this.profilesService.findOne(newProfileId);
    if (!res) return null;
    return res;
  }

  @Put(':id')
  async update(
    @Param() params: FindOneProfileDto,
    @Body() data: UpdateProfileDto,
  ): Promise<FindOneProfileResponseDto | null> {
    const updatedId = await this.profilesService.update({
      ...data,
      id: params.id,
    });
    if (updatedId) {
      const res = this.profilesService.findOne(params.id);
      if (!res) return null;
      return res;
    }
    return null;
  }

  @Patch(':id/status')
  updateStatus(
    @Param() params: FindOneProfileDto,
    @Body() data: UpdateProfileStatusDto,
  ): UpdateProfileStatusResponseDto {
    return { id: Number(params.id), status: data.status };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param() _params: FindOneProfileDto) {}
}
