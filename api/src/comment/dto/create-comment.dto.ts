import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  body: string;
}
