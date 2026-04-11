import { SetMetadata } from '@nestjs/common';

export const RequirePermission = (value: string) =>
  SetMetadata('permission', value);
