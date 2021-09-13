import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagRepository } from '../tag/service/tag.repository';
import { PostsController } from './controller/posts.controller';
import { PostsRepository } from './service/posts.repository';
import { PostsService } from './service/posts.service';
import { UserRepository } from '../user/service/users.repository';
import { ViewRepotitory } from './service/view.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PostsRepository,
      TagRepository,
      UserRepository,
      ViewRepotitory,
    ]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
