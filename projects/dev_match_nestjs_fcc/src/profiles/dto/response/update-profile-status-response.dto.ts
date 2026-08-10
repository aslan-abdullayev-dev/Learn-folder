import { ProfileStatus } from '../../enums/profile-status.enum';

export class UpdateProfileStatusResponseDto {
  id: number;
  status: ProfileStatus;
}
