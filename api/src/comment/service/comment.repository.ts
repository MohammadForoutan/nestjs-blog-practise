import { BadRequestException, NotFoundException } from '@nestjs/common';
import { User, UserRole } from '../../user/models/user.entity';
import { Post } from '../../post/models/posts.entity';
import {
  DeleteResult,
  EntityRepository,
  Repository,
  UpdateResult,
} from 'typeorm';
import { Comment } from '../models/comment.entity';
import { UpdateCommentDto } from '../dto/update-comment.dto';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CommentStatus } from '../models/comment-status.enum';

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
  public async createOne(
    createCommentDto: CreateCommentDto,
    user: User,
    post: Post,
  ): Promise<Comment> {
    const { body } = createCommentDto;
    const comment: Comment = this.create({ body, user, post });
    return this.save(comment);
  }

  public async getOneById(id: string): Promise<Comment> {
    const comment: Comment = await this.findOne(id);
    if (!comment) {
      throw new NotFoundException(`comment with '${id} id is not found.`);
    }
    return comment;
  }

  public async deleteOne(id: string, user: User): Promise<DeleteResult> {
    let result: DeleteResult;
    const comment: Comment = await this.getOneById(id);

    if (user.role === UserRole.ADMIN) {
      result = await this.delete({ id: comment.id });
    } else {
      result = await this.delete({ id, user });
      if (result.affected < 1) {
        throw new NotFoundException(`comment with ${id} id not found.`);
      }
    }

    return result;
  }

  public async updateOne(
    updateCommentDto: UpdateCommentDto,
    user: User,
    id: string,
  ): Promise<UpdateResult> {
    const { body } = updateCommentDto;
    let result: UpdateResult;
    const comment: Comment = await this.getOneById(id);
    if (user.role === UserRole.ADMIN) {
      result = await this.update({ id: comment.id }, { body });
    } else {
      result = await this.update({ id, user }, { body });
    }

    if (result.affected < 1) {
      throw new BadRequestException(`comment with this '${id}' id not found`);
    }

    return result;
  }

  public async getPostComments(post: Post, user: User): Promise<Comment[]> {
    if (user.role === UserRole.ADMIN) {
      return this.find({ post });
    } else {
      return this.find({ post, status: CommentStatus.ACCEPTED });
    }
  }
}
