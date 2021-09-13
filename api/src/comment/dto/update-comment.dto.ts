import { IsNotEmpty, IsOptional } from 'class-validator';
import { CommentStatus } from '../models/comment-status.enum';

export class UpdateCommentDto {
  @IsNotEmpty()
  @IsOptional()
  body?: string;

  @IsOptional()
  status?: CommentStatus;
}
