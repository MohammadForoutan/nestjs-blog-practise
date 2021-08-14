import { IsNotEmpty } from 'class-validator';

export class UpdateTagDto {
  @IsNotEmpty()
  name: string;
}
