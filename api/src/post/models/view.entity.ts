import { User } from '../../user/models/user.entity';
import { Post } from '../../post/models/posts.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
