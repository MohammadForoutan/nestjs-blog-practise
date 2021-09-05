import { BadRequestException, NotFoundException } from '@nestjs/common';
import { User } from '../user/user.entity';
import { Post } from '../post/posts.entity';
import {
  DeleteResult,
  EntityRepository,
  Repository,
  UpdateResult,
} from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
  public async createComment(
    createCommentDto: CreateCommentDto,
    user: User,
    post: Post,
  ): Promise<Comment> {
    const { body } = createCommentDto;
    const comment: Comment = this.create({ body, user, post });

    await this.save(comment);
    return comment;
  }

  public async deleteComment(id: string, user: User): Promise<void> {
    let result: DeleteResult;
    if (user.canAccessDashboard) {
      result = await this.delete({ id });
    } else {
      result = await this.delete({ id, user });
    }

    if (result.affected) {
      throw new NotFoundException(`comment with ${id} not found.`);
    }
  }
  public async updateComment(
    updateCommentDto: UpdateCommentDto,
    user: User,
    id: string,
  ): Promise<void> {
    const { body } = updateCommentDto;
    let result: UpdateResult;
    if (user.canAccessDashboard) {
      result = await this.update({ id }, { body });
    } else {
      result = await this.update({ id, user }, { body });
    }

    if (result.affected < 1) {
      throw new BadRequestException(`comment with this '${id}' id not found`);
    }
  }

  public async getPostComments(post: Post): Promise<Comment[]> {
    return await this.find({ post });
  }
}
