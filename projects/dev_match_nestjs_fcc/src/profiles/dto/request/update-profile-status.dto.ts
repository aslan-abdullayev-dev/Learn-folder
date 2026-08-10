import { IsEnum } from 'class-validator';
import { ProfileStatus } from '../../enums/profile-status.enum';

export class UpdateProfileStatusDto {
  @IsEnum(ProfileStatus)
  status: ProfileStatus;
}
