import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { DeleteResult } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePublishStatusDto } from './dto/update-publish.dto';
import { Post } from './posts.entity';
import { PostsRepository } from './posts.repository';
import { PUBLISH_STATUS } from './publish-status.enum';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsRepository) private postsRepository: PostsRepository,
  ) {}

  public getAllPosts(user: User): Promise<Post[]> {
    return this.postsRepository.getAllPosts(user);
  }

  public async getPostById(id: string, user: User): Promise<Post> {
    const post = await this.postsRepository.getPostById(id, user);
    if (!post) {
      throw new NotFoundException(`Post with ${id} was not found.`);
    }

    return post;
  }

  public createPost(createPostDto: CreatePostDto, user: User): Promise<Post> {
    return this.postsRepository.createPost(createPostDto, user);
  }

  public async deletePost(id: string, user: User): Promise<void> {
    const result: DeleteResult = await this.postsRepository.deletePost(
      id,
      user,
    );

    if (!result.affected) {
      throw new NotFoundException(`Post with ${id} was not found.`);
    }
  }

  public async updatePublishStatus(
    id: string,
    publishUpdate: UpdatePublishStatusDto,
    user: User,
  ): Promise<void> {
    const { publishStatus } = publishUpdate;
    const post = await this.postsRepository.getPostById(id, user);

    if (publishStatus === PUBLISH_STATUS.PUBLIC) {
      post.isPublish = true;
    } else if (publishStatus === PUBLISH_STATUS.HIDDEN) {
      post.isPublish = false;
    }

    await this.postsRepository.save(post);
  }
}
