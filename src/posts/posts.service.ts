import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { DeleteResult } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePublishStatusDto } from './dto/update-publish.dto';
import { Post } from './posts.entity';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsRepository) private postsRepository: PostsRepository,
  ) {}

  public getAllPosts(): Promise<Post[]> {
    return this.postsRepository.getAllPosts();
  }

  public async getPostById(id: string): Promise<Post> {
    const post = await this.postsRepository.getPostById(id);
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
    publishStatus: UpdatePublishStatusDto,
    user: User,
  ): Promise<void> {
    const { publish } = publishStatus;
    const post = await this.postsRepository.findOne({ id, user });

    if (publish === 'true') {
      post.isPublish = true;
    } else if (publish === 'false') {
      post.isPublish = false;
    }

    await this.postsRepository.save(post);
  }
}
