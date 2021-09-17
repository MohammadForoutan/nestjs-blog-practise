import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../user/models/user.entity';
import { CreatePostDto } from '../../post/dto/create-post.dto';
import { Post } from '../../post/models/posts.entity';
import { PostsRepository } from '../../post/service/posts.repository';
import { Comment } from '../models/comment.entity';
import { CommentRepository } from './comment.repository';
import { UpdateCommentDto } from '../dto/update-comment.dto';
import { UpdateCommentStatusDto } from '../dto/update-comment-status.dto';
import { UpdateResult } from 'typeorm';

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
    return this.commentRepository.createOne(createPostDto, user, post);
  }

  public deleteComment(id: string, user: User): void {
    this.commentRepository.deleteOne(id, user);
  }

  public updateComment(
    updateCommentDto: UpdateCommentDto,
    id: string,
    user: User,
  ): void {
    this.commentRepository.updateOne(updateCommentDto, user, id);
  }

  public async getPostComments(postId: string, user: User): Promise<Comment[]> {
    const post: Post = await this.postRepository.getPostById(postId, user);
    return this.commentRepository.getPostComments(post, user);
  }

  public updateCommentStatus(
    updateCommentStatusDto: UpdateCommentStatusDto,
    id: string,
  ): Promise<UpdateResult> {
    return this.commentRepository.updateOneStatus(updateCommentStatusDto, id);
  }
}
