import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsRepository } from '../post/service/posts.repository';
import { CommentController } from './controller/comment.controller';
import { CommentRepository } from './service/comment.repository';
import { CommentService } from './service/comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([CommentRepository, PostsRepository])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
