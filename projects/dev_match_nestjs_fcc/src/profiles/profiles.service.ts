import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { CreateProfileServiceInterface } from './interfaces/create-profile-service.interface';
import { ProfileDomain } from './interfaces/profile-domain.interface';

@Injectable()
export class ProfilesService {
  private profiles: ProfileDomain[] = [];

  findAll() {
    return this.profiles;
  }

  findOne(id: string) {
    return this.profiles.find((profile) => profile.id === id);
  }

  create(body: CreateProfileServiceInterface): string {
    const uuid = randomUUID();
    this.profiles.push({ id: uuid, ...body });
    return uuid;
  }
}
