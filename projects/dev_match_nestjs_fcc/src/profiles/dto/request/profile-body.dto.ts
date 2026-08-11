import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ProfileStatus } from '../../enums/profile-status.enum';

export class ProfileBodyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(ProfileStatus)
  @IsNotEmpty()
  status: ProfileStatus;
}
