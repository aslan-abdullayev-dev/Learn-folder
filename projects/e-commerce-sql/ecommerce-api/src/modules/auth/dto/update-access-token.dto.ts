import { IsString } from 'class-validator';

export class UpdateAccessTokenDto {
  @IsString()
  refreshToken: string;
}
