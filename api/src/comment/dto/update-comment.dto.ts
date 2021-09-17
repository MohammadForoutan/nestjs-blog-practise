import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCommentDto {
  @IsNotEmpty()
  @IsString()
  body!: string;
}
