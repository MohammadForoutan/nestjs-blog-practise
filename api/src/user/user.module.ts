import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsRepository } from 'src/post/posts.repository';
import { UserRepository } from './users.repository';
import { UserService } from './user.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([UserRepository, PostsRepository]),
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
