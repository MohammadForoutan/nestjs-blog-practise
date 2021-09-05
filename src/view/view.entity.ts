import { User } from '../user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from '../post/posts.entity';

@Entity()
export class View {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'cidr' })
  ip: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user: User) => user.views, { onDelete: 'SET NULL' })
  user: User;

  @ManyToOne(() => Post, (post: Post) => post.views, { onDelete: 'CASCADE' })
  post: Post;
}
