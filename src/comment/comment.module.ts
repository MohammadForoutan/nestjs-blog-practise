import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsRepository } from 'src/posts/posts.repository';
import { CommentController } from './comment.controller';
import { CommentRepository } from './comment.repository';
import { CommentService } from './comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([CommentRepository, PostsRepository])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
