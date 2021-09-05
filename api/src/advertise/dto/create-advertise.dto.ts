import { IsNotEmpty } from 'class-validator';

export class CreateAdvertiseDto {
  @IsNotEmpty()
  name: string;
  description: string;
  media: string;
}
