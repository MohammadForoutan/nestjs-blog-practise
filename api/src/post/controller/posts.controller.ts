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
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../../auth/guard/roles.guard';
import { User } from '../../user/models/user.entity';
import { GetUser } from '../../user/service/get-user.decorator';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePublishStatusDto } from '../dto/update-publish.dto';
import { Post as PostEntity } from '../models/posts.entity';
import { PostsService } from '../service/posts.service';

@ApiTags('Post')
@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  // POST
  @ApiCreatedResponse({ description: 'post has been created successfully.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized error.' })
  @ApiBadRequestResponse({ description: 'please enter required values.' })
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
  @ApiOkResponse({ description: 'retrieved posts successfully' })
  @ApiQuery({
    name: 'page',
    description: 'page for pagination. - DEFAULT = 1',
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    description: 'limit post in a page. - DEFAULT = 10',
    required: false,
  })
  public getAllPosts(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<Pagination<PostEntity>> {
    limit = limit > 100 ? 100 : limit;
    return this.postService.paginate({
      page: Number(page),
      limit: Number(limit),
    });
  }

  @Get('/:id')
  @ApiParam({ name: 'id', required: true })
  @ApiOkResponse({ description: 'get one post' })
  @ApiNotFoundResponse({ description: 'post has not found.' })
  public getPostById(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: User,
    @Ip() ip: string,
  ): Promise<PostEntity> {
    return this.postService.getPostById(id, user, ip);
  }

  // DELETE
  @Delete('/:id')
  @ApiParam({ name: 'id', required: true })
  @ApiOkResponse({ description: 'one post has been deleted successfully' })
  @ApiNotFoundResponse({ description: 'post has not found.' })
  @ApiUnauthorizedResponse({
    description: 'user should login first',
  })
  @ApiForbiddenResponse({ description: 'Forbidden !!!' })
  @UseGuards(JwtAuthGuard)
  public deletePost(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: User,
  ): void {
    return this.postService.deletePost(id, user);
  }

  // UPDATE / PATCH
  @Patch('/:id/publish-status')
  @ApiParam({ name: 'id', required: true })
  @ApiOkResponse({ description: 'one post has been deleted successfully' })
  @ApiNotFoundResponse({ description: 'post has not found.' })
  @ApiBadRequestResponse({
    description: `publish-status isn't in publishStatus enum`,
  })
  @ApiUnauthorizedResponse({ description: 'user should login first' })
  @ApiForbiddenResponse({ description: 'Forbidden !!!' })
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
  @ApiParam({ name: 'id', required: true })
  @ApiOkResponse({ description: 'post has been liked or disliked' })
  @ApiNotFoundResponse({ description: 'post has not found.' })
  @ApiUnauthorizedResponse({ description: 'user should login first' })
  @UseGuards(JwtAuthGuard)
  public toggleLike(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: User,
  ): any {
    return this.postService.toggleLike(id, user);
  }
}
