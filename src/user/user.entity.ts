import { Comment } from '../comment/comment.entity';
import { Post } from '../post/posts.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false, default: false })
  canAccessDashboard: boolean;

  @OneToMany(() => Post, (post: Post) => post.user)
  post: Post[];

  @OneToMany(() => Comment, (comment: Comment) => comment.user)
  comment: Comment[];
}
