import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dto/create-post.dto';
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
    const post = await this.postsRepository.findOne(id);
    if (!post) {
      throw new NotFoundException(`Post with ${id} was not found.`);
    }

    return post;
  }

  public createPost(createPostDto: CreatePostDto): Promise<Post> {
    return this.postsRepository.createPost(createPostDto);
  }

  public async deletePost(id: string): Promise<void> {
    const result = await this.postsRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException(`Post with ${id} was not found.`);
    }
  }

  public async updatePublishStatus(
    id: string,
    publishStatus: boolean,
  ): Promise<void> {
    const post = await this.getPostById(id);
    post.isPublish = publishStatus;

    await this.postsRepository.save(post);
  }
}
