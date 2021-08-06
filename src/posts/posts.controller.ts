import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { Post as PostEntity } from './posts.entity';
import { DeleteResult } from 'typeorm';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @Post()
  public createPost(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    return this.postService.createPost(createPostDto);
  }

  @Get()
  public getAllPosts(): Promise<PostEntity[]> {
    return this.postService.getAllPosts();
  }

  @Get('/:id')
  public getPostById(@Param() id: string): Promise<PostEntity> {
    return this.postService.getPostById(id);
  }

  @Delete('/:id')
  public deletePost(@Param() id: string): Promise<void> {
    return this.postService.deletePost(id);
  }

  @Patch(':/id')
  public updatePublishStatus(
    @Param() id: string,
    @Body() publishStatus: boolean,
  ): Promise<void> {
    return this.postService.updatePublishStatus(id, publishStatus);
  }
}
