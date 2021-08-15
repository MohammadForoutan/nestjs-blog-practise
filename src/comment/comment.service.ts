import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { CreatePostDto } from '../posts/dto/create-post.dto';
import { Post } from '../posts/posts.entity';
import { PostsRepository } from '../posts/posts.repository';
import { Comment } from './comment.entity';
import { CommentRepository } from './comment.repository';
import { UpdateCommentDto } from './dto/update-comment.dto';

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
  ): Promise<Comment> {
    const post: Post = await this.postRepository.getPostById(postId, user);
    return this.commentRepository.createComment(createPostDto, user, post);
  }

  public deleteComment(id: string, user: User): void {
    this.commentRepository.deleteComment(id, user);
  }

  public updateComment(
    updateCommentDto: UpdateCommentDto,
    id: string,
    user: User,
  ): void {
    this.commentRepository.updateComment(updateCommentDto, user, id);
  }

  public async getPostComments(postId: string, user: User): Promise<Comment[]> {
    const post: Post = await this.postRepository.getPostById(postId, user);
    return this.commentRepository.getPostComments(post);
  }
}
