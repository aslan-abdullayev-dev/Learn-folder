import { IsUUID } from 'class-validator';

export class FindOneProfileDto {
  @IsUUID()
  id: string;
}
