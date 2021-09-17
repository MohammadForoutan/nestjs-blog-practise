import { IsDefined, IsEnum, IsNotEmpty } from 'class-validator';
import { CommentStatus } from '../models/comment-status.enum';

export class UpdateCommentStatusDto {
  @IsDefined()
  @IsNotEmpty()
  @IsEnum(CommentStatus)
  status: CommentStatus;
}
