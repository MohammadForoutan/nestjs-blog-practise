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
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { Post as PostEntity } from './posts.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { UpdatePublishStatusDto } from './dto/update-publish.dto';

@Controller('posts')
@UseGuards(AuthGuard())
export class PostsController {
  constructor(private postService: PostsService) {}

  @Post()
  public createPost(
    @Body() createPostDto: CreatePostDto,
    @GetUser() user: User,
  ): Promise<PostEntity> {
    return this.postService.createPost(createPostDto, user);
  }

  @Get()
  public getAllPosts(@GetUser() user: User): Promise<PostEntity[]> {
    return this.postService.getAllPosts(user);
  }

  @Get('/:id')
  public getPostById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<PostEntity> {
    return this.postService.getPostById(id, user);
  }

  @Delete('/:id')
  public deletePost(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this.postService.deletePost(id, user);
  }

  @Patch('/:id/publish-status')
  public updatePublishStatus(
    @Param('id') id: string,
    @Body() publishUpdate: UpdatePublishStatusDto,
    @GetUser() user: User,
  ): Promise<void> {
    return this.postService.updatePublishStatus(id, publishUpdate, user);
  }
}
