import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CreatePostDto } from 'src/posts/dto/create-post.dto';
import { Post } from 'src/posts/posts.entity';
import { PostsRepository } from 'src/posts/posts.repository';
import { DeleteResult } from 'typeorm';
import { CommentRepository } from './comment.repository';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentRepository)
    private commentRepository: CommentRepository,
    private postRepository: PostsRepository,
  ) {}
  public async createComment(
    createPostDto: CreatePostDto,
    user: User,
    postId: string,
  ): Promise<void> {
    const post: Post = await this.postRepository.getPostById(postId, user);
    this.commentRepository.createComment(createPostDto, user, post);
  }

  public deleteComment(id: string, user: User): Promise<DeleteResult> {
    return this.commentRepository.deleteComment(id, user);
  }
}
