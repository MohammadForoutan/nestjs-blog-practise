import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import { TagModule } from './tag/tag.module';
import { AdvertiseModule } from './advertise/advertise.module';

@Module({
  imports: [
    AuthModule,
    PostsModule,
    CommentModule,
    TagModule,
    AdvertiseModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      // name: 'blog-postgres-nestjs-practise', // NO NEED
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: '36113611',
      database: 'blog',
      autoLoadEntities: true, // add entities to entities array which they're register with forFeature method
      // entities: ['**/*.entity.ts'],
      synchronize: true, // for development
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
