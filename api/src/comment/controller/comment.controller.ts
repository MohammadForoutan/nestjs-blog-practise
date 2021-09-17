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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UpdateResult } from 'typeorm';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../../auth/guard/roles.guard';
import { CreatePostDto } from '../../post/dto/create-post.dto';
import { User } from '../../user/models/user.entity';
import { GetUser } from '../../user/service/get-user.decorator';
import { UpdateCommentStatusDto } from '../dto/update-comment-status.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';
import { Comment } from '../models/comment.entity';
import { CommentService } from '../service/comment.service';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post('/post/:postId')
  @ApiCreatedResponse({ description: 'comment has been created successfully.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized error.' })
  @ApiBadRequestResponse({ description: 'please enter required values.' })
  @UseGuards(JwtAuthGuard)
  public createComment(
    @Body() createPostDto: CreatePostDto,
    @Param('postId') postId: string,
    @GetUser() user: User,
  ): Promise<Comment> {
    return this.commentService.createComment(createPostDto, user, postId);
  }

  @Get('/post/:postId')
  @ApiOkResponse({ description: 'all comments of a post has been retrieved.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized error.' })
  @ApiParam({ name: 'postId', description: 'to get all comments of a post' })
  public getPostComments(
    @Param('postId', ParseUUIDPipe) postId: string,
    @GetUser() user: User,
  ): Promise<Comment[]> {
    return this.commentService.getPostComments(postId, user);
  }

  @Delete('/:id')
  @ApiOkResponse({ description: 'comment has been deleted successfully.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized error.' })
  @ApiNotFoundResponse({
    description: "comment isn't exist or who request is not owner",
  })
  @ApiParam({ name: 'id', description: 'enter comment id for deletion.' })
  @UseGuards(JwtAuthGuard)
  public deletePost(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: User,
  ): void {
    this.commentService.deleteComment(id, user);
  }

  @Patch('/:id')
  @ApiOkResponse({ description: 'comment has been updated successfully.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized error.' })
  @ApiParam({ name: 'id', description: 'enter comment id for updating.' })
  @UseGuards(JwtAuthGuard)
  public updateComment(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @GetUser() user: User,
  ): void {
    this.commentService.updateComment(updateCommentDto, id, user);
  }

  @Patch('/:id/status')
  @ApiOkResponse({ description: 'comment has been updated successfully.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized error.' })
  @ApiForbiddenResponse({ description: 'Forbidden!' })
  @ApiParam({ name: 'id', description: 'enter comment id for updating.' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  public updateCommentStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCommentStatusDto: UpdateCommentStatusDto,
  ): Promise<UpdateResult> {
    return this.commentService.updateCommentStatus(updateCommentStatusDto, id);
  }
}
