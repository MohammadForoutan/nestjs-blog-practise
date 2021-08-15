import { Comment } from '../comment/comment.entity';
import { Post } from '../posts/posts.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Post, (post: Post) => post.user)
  post: Post[];

  @OneToMany(() => Comment, (comment: Comment) => comment.user)
  comment: Comment[];
}
