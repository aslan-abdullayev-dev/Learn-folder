import { Module } from '@nestjs/common';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './services/profiles.service';
import { ProfilesStorageService } from './services/profiles-storage.service';

@Module({
  controllers: [ProfilesController],
  providers: [ProfilesService, ProfilesStorageService],
})
export class ProfilesModule {}
