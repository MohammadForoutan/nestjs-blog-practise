import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../user/get-user.decorator';
import { User } from '../user/user.entity';
import { CreatePostDto } from '../post/dto/create-post.dto';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';
import { UpdateCommentDto } from './dto/update-comment.dto';

UseGuards(AuthGuard());
@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post('/post/:postId')
  public createComment(
    @Body() createPostDto: CreatePostDto,
    @Param('postId') postId: string,
    @GetUser() user: User,
  ): Promise<Comment> {
    return this.commentService.createComment(createPostDto, user, postId);
  }

  @Get('/post/:postId')
  public getPostComments(
    @Param('postId') postId: string,
    @GetUser() user: User,
  ): Promise<Comment[]> {
    return this.commentService.getPostComments(postId, user);
  }

  @Delete('/:id')
  public deletePost(@Param('id') id: string, @GetUser() user: User): void {
    this.commentService.deleteComment(id, user);
  }

  @Patch(':/id')
  public updateComment(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @GetUser() user: User,
  ): void {
    this.commentService.updateComment(updateCommentDto, id, user);
  }
}
