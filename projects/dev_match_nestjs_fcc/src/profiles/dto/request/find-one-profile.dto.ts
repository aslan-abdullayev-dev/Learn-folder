import { IsNotEmpty, IsString } from 'class-validator';

export class FindOneProfileDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
