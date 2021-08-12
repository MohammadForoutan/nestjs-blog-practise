import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreatePostDto } from 'src/posts/dto/create-post.dto';
import { DeleteResult } from 'typeorm';
import { CommentService } from './comment.service';

UseGuards(AuthGuard());
@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post('/:postId')
  public createComment(
    @Body() createPostDto: CreatePostDto,
    @Param('postId') postId: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this.commentService.createComment(createPostDto, user, postId);
  }

  @Delete()
  public deletePost(@Param('/:id') id: string, @GetUser() user: User) {
    this.commentService.deleteComment(id, user);
  }

  //   @Patch()
  //   public updateComment() {}
}
