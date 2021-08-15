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
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { UpdatePublishStatusDto } from './dto/update-publish.dto';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  // POST
  @Post()
  @UseGuards(AuthGuard())
  public createPost(
    @Body() createPostDto: CreatePostDto,
    @GetUser() user: User,
  ): Promise<PostEntity> {
    return this.postService.createPost(createPostDto, user);
  }

  // GET
  @Get()
  public getAllPosts(): Promise<PostEntity[]> {
    return this.postService.getAllPosts();
  }

  @Get('/:id')
  public getPostById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<PostEntity> {
    return this.postService.getPostById(id, user);
  }

  // DELETE
  @Delete('/:id')
  @UseGuards(AuthGuard())
  public deletePost(@Param('id') id: string, @GetUser() user: User): void {
    return this.postService.deletePost(id, user);
  }

  // UPDATE / PATCH
  @Patch('/:id/publish-status')
  @UseGuards(AuthGuard())
  public updatePublishStatus(
    @Param('id') id: string,
    @Body() publishUpdateDto: UpdatePublishStatusDto,
    @GetUser() user: User,
  ): Promise<void> {
    return this.postService.updatePublishStatus(id, publishUpdateDto, user);
  }
}
