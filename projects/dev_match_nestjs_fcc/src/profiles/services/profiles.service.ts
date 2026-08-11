import { Injectable, OnModuleInit } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { CreateProfileServiceInterface } from '../interfaces/create-profile-service.interface';
import { ProfileDomain } from '../interfaces/profile-domain.interface';
import { UpdateProfileServiceInterface } from '../interfaces/update-profile-service.interface';
import { ProfileStatus } from '../enums/profile-status.enum';
import { ProfilesStorageService } from './profiles-storage.service';

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
    return this.profiles.find((profile) => profile.id === id);
  }

  async create(body: CreateProfileServiceInterface): Promise<string> {
    const uuid = randomUUID();
    this.profiles.push({ id: uuid, status: ProfileStatus.AVAILABLE, ...body });
    await this.storage.write(this.profiles);
    return uuid;
  }

  async update(body: UpdateProfileServiceInterface): Promise<string | null> {
    const target = this.profiles.findIndex((profile) => profile.id === body.id);
    if (target > -1) {
      this.profiles[target] = { ...body };
      await this.storage.write(this.profiles);
      return body.id;
    } else {
      return null;
    }
  }
}
