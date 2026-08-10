import { IsNotEmpty, IsString } from 'class-validator';

export class ProfileBodyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
