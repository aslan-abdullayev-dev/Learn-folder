import { IsString } from 'class-validator';

export class FindAllProfilesDto {
  @IsString()
  location: string;
}
