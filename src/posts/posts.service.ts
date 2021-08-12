import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
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

  public createPost(createPostDto: CreatePostDto, user: User): Promise<Post> {
    return this.postsRepository.createPost(createPostDto, user);
  }

  public getAllPosts(): Promise<Post[]> {
    return this.postsRepository.getAllPosts();
  }

  public async getPostById(id: string, user: User): Promise<Post> {
    return await this.postsRepository.getPostById(id, user);
  }

  public async deletePost(id: string, user: User): Promise<void> {
    await this.postsRepository.deletePost(id, user);
  }

  public async updatePublishStatus(
    id: string,
    publishUpdateDto: UpdatePublishStatusDto,
    user: User,
  ): Promise<void> {
    const { publishStatus } = publishUpdateDto;
    const post = await this.postsRepository.findOne({ id, user });

    if (publishStatus === PUBLISH_STATUS.PUBLIC) {
      post.isPublish = true;
    } else if (publishStatus === PUBLISH_STATUS.HIDDEN) {
      post.isPublish = false;
    }

    await this.postsRepository.save(post);
  }
}
