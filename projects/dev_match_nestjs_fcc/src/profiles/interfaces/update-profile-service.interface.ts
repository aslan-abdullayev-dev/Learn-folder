import { ProfileStatus } from '../enums/profile-status.enum';

export type UpdateProfileServiceInterface = {
  id: string;
  name: string;
  description: string;
  status: ProfileStatus;
};
