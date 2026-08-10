import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class FindOneProfileDto {
  @Type(() => Number)
  @IsInt()
  id: number;
}
