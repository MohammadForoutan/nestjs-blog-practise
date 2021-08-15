import { NotFoundException } from '@nestjs/common';
import { User } from '../auth/user.entity';
import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './posts.entity';

@EntityRepository(Post)
export class PostsRepository extends Repository<Post> {
  public async createPost(
    createPostDto: CreatePostDto,
    user: User,
  ): Promise<Post> {
    const { title, body } = createPostDto;
    const post: Post = this.create({ title, body, isPublish: false, user });
    return await this.save(post);
  }

  public async getAllPosts(): Promise<Post[]> {
    return await this.find();
  }

  public async getPostById(id: string, user: User): Promise<Post> {
    const post: Post = await this.findOne({ id });

    // if not found or don't show hidden post for others(not owner)
    if (!post || (post.user !== user && !post.isPublish)) {
      throw new NotFoundException(`post with ${id} not found.`);
    }

    return post;
  }

  public async deletePost(id: string, user: User): Promise<void> {
    const result: DeleteResult = await this.delete({ id, user });
    if (!result.affected) {
      throw new NotFoundException(`Post with ${id} was not found.`);
    }
  }
}
