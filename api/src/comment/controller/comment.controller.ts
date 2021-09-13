import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { CreatePostDto } from 'src/post/dto/create-post.dto';
import { User } from 'src/user/models/user.entity';
import { GetUser } from 'src/user/service/get-user.decorator';
import { UpdateCommentDto } from '../dto/update-comment.dto';
import { Comment } from '../models/comment.entity';
import { CommentService } from '../service/comment.service';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post('/post/:postId')
  @UseGuards(JwtAuthGuard)
  public createComment(
    @Body() createPostDto: CreatePostDto,
    @Param('postId') postId: string,
    @GetUser() user: User,
  ): Promise<Comment> {
    return this.commentService.createComment(createPostDto, user, postId);
  }

  @Get('/post/:postId')
  public getPostComments(
    @Param('postId', ParseUUIDPipe) postId: string,
    @GetUser() user: User,
  ): Promise<Comment[]> {
    return this.commentService.getPostComments(postId, user);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  public deletePost(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: User,
  ): void {
    this.commentService.deleteComment(id, user);
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  public updateComment(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @GetUser() user: User,
  ): void {
    this.commentService.updateComment(updateCommentDto, id, user);
  }
}
