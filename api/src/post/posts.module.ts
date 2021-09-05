import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagRepository } from '../tag/tag.repository';
import { AuthModule } from '../auth/auth.module';
import { PostsController } from './posts.controller';
import { PostsRepository } from './posts.repository';
import { PostsService } from './posts.service';
import { UserRepository } from 'src/user/users.repository';
import { ViewRepotitory } from 'src/view/view.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PostsRepository,
      TagRepository,
      UserRepository,
      ViewRepotitory,
    ]),
    AuthModule,
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
