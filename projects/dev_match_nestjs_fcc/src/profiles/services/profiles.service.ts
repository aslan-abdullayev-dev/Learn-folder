import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { CreateProfileServiceInterface } from '../interfaces/create-profile-service.interface';
import { ProfileDomain } from '../interfaces/profile-domain.interface';
import { UpdateProfileServiceInterface } from '../interfaces/update-profile-service.interface';
import { ProfileStatus } from '../enums/profile-status.enum';
import { ProfilesStorageService } from './profiles-storage.service';
import { UpdateProfileStatusServiceInterface } from '../interfaces/update-profile-status-service.interface';

@Injectable()
export class ProfilesService implements OnModuleInit {
  private profiles: ProfileDomain[] = [];

  constructor(private readonly storage: ProfilesStorageService) {}

  async onModuleInit() {
    this.profiles = await this.storage.read();
  }

  findAll() {
    return this.profiles;
  }

  findOne(id: string) {
    const matchingProfile = this.profiles.find((profile) => profile.id === id);
    if (!matchingProfile) throw new NotFoundException();
    return matchingProfile;
  }

  async create(body: CreateProfileServiceInterface): Promise<string> {
    const uuid = randomUUID();
    this.profiles.push({ id: uuid, status: ProfileStatus.AVAILABLE, ...body });
    await this.storage.write(this.profiles);
    return uuid;
  }

  async update(body: UpdateProfileServiceInterface): Promise<string> {
    const target = this.profiles.findIndex((profile) => profile.id === body.id);
    if (target > -1) {
      this.profiles[target] = { ...body };
      await this.storage.write(this.profiles);
      return body.id;
    } else {
      throw new NotFoundException();
    }
  }

  async updateStatus(
    body: UpdateProfileStatusServiceInterface,
  ): Promise<string> {
    const target = this.profiles.findIndex((profile) => profile.id === body.id);
    if (target > -1) {
      this.profiles[target].status = body.status;
      await this.storage.write(this.profiles);
      return body.id;
    } else {
      throw new NotFoundException();
    }
  }

  async remove(id: string) {
    const target = this.profiles.findIndex((profile) => profile.id === id);
    if (target > -1) {
      this.profiles.splice(target, 1);
      await this.storage.write(this.profiles);
    } else {
      throw new NotFoundException();
    }
  }
}
