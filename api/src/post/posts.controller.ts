import {
  Body,
  Controller,
  Delete,
  Get,
  Ip,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { Post as PostEntity } from './posts.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../user/get-user.decorator';
import { User } from '../user/user.entity';
import { UpdatePublishStatusDto } from './dto/update-publish.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  // POST
  @Post()
  @UseGuards(JwtAuthGuard)
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
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: User,
    @Ip() ip: string,
  ): Promise<PostEntity> {
    return this.postService.getPostById(id, user, ip);
  }

  // DELETE
  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  public deletePost(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: User,
  ): void {
    return this.postService.deletePost(id, user);
  }

  // UPDATE / PATCH
  @Patch('/:id/publish-status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  public updatePublishStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() publishUpdateDto: UpdatePublishStatusDto,
    @GetUser() user: User,
  ): Promise<void> {
    return this.postService.updatePublishStatus(id, publishUpdateDto, user);
  }

  // UPDATE /PATCH
  @Patch('/:id/like')
  @UseGuards(JwtAuthGuard)
  public toggleLike(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: User,
  ): any {
    return this.postService.toggleLike(id, user);
  }
}
