import { NotFoundException } from '@nestjs/common';
import { User } from '../user/user.entity';
import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './posts.entity';
import { Tag } from '../tag/tag.entity';

@EntityRepository(Post)
export class PostsRepository extends Repository<Post> {
  public async createPost(
    createPostDto: CreatePostDto,
    postTags: Tag[],
    user: User,
  ): Promise<Post> {
    const { title, body } = createPostDto;

    const post: Post = this.create({
      title,
      body,
      isPublish: false,
      user,
      tags: postTags,
    });

    console.log({ postTags });

    return await this.save(post);
  }

  public async getAllPosts(): Promise<Post[]> {
    return await this.find();
  }

  public getPostById(id: string, user: User): Promise<Post> {
    let post: Post;
    return this.findOne(id).then((foundPost) => {
      post = foundPost;
      // if not found or don't show hidden post for others(not owner)
      if (!post || (post.user !== user && !post.isPublish)) {
        throw new NotFoundException(`post with ${id} not found.`);
      }
      return post;
    });
  }

  public async deletePost(id: string, user: User): Promise<void> {
    const result: DeleteResult = await this.delete({ id, user });
    if (!result.affected) {
      throw new NotFoundException(`Post with ${id} was not found.`);
    }
  }

  public async toggleLike(id: string, user: User): Promise<any> {
    const post: Post = await this.findOne(id, { relations: ['likes'] });
    const isLiked = post.likes.find((like) => like.id === user.id);

    console.log({ isLiked });

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

    console.log({ post });

    await this.save(post);
  }

  public async addView(post: Post): Promise<void> {
    post.view_count++;
    await this.save(post);
  }
}
