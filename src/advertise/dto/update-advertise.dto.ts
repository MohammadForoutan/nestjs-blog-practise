import { IsNotEmpty } from 'class-validator';

export class UpdateAdvertiseDto {
  @IsNotEmpty()
  name: string;
  description: string;
}
