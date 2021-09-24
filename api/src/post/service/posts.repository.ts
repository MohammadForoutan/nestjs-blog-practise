import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Tag } from '../../tag/models/tag.entity';
import { User } from '../../user/models/user.entity';
import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { CreatePostDto } from '../dto/create-post.dto';
import { Post } from '../models/posts.entity';

@EntityRepository(Post)
export class PostsRepository extends Repository<Post> {
  public createOne(
    createPostDto: CreatePostDto,
    postTags: Tag[],
    user: User,
  ): Promise<Post> {
    const { title, body } = createPostDto;

    const post: Post = this.create({
      title,
      body,
      user,
      tags: postTags,
    });

    return this.save(post).catch(() => {
      throw new InternalServerErrorException();
    });
  }

  public getAllPosts(): Promise<Post[]> {
    return this.find({ isPublish: true }).catch(() => {
      throw new InternalServerErrorException();
    });
  }

  public getPostById(id: string, user: User): Promise<Post> {
    return this.findOne(id)
      .then((foundPost) => {
        const post: Post = foundPost;
        // if postnot found or don't show hidden post for others(not owner)
        if (!post || (post.user !== user && !post.isPublish)) {
          throw new NotFoundException(`post with ${id} not found.`);
        }
        return post;
      })
      .catch(() => {
        throw new InternalServerErrorException();
      });
  }

  public async deleteOne(id: string, user: User): Promise<DeleteResult> {
    try {
      const result: DeleteResult = await this.delete({ id, user });
      if (!result.affected) {
        throw new NotFoundException(`Post with ${id} was not found.`);
      }
      return result;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  public async toggleLike(id: string, user: User): Promise<Post> {
    const post: Post = await this.findOne(id, { relations: ['likes'] });
    const isLiked = post.likes.find((like) => like.id === user.id);

    // if liked
    if (isLiked) {
      // delete user id
      post.likes = post.likes.filter((like) => like.id !== user.id);
      post.like_count = post.like_count - 1;
    } else {
      // if not like add user id
      post.likes.unshift(user);
      post.like_count = post.like_count + 1;
    }

    return this.save(post).catch(() => {
      throw new InternalServerErrorException();
    });
  }

  public async addView(post: Post): Promise<Post> {
    post.view_count++;
    return this.save(post).catch(() => {
      throw new InternalServerErrorException();
    });
  }
}
