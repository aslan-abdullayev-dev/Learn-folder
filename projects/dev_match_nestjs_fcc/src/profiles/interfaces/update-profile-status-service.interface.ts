import { ProfileStatus } from '../enums/profile-status.enum';

export type UpdateProfileStatusServiceInterface = {
  id: string;
  status: ProfileStatus;
};
