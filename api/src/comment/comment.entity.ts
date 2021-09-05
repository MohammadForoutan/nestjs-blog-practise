import { User } from '../user/user.entity';
import { Post } from '../post/posts.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  body: string;

  @Column({ default: null, type: 'boolean' })
  status: boolean;

  @ManyToOne(() => Post, (post: Post) => post.comments, { eager: false })
  post: Post;

  @ManyToOne(() => User, (user: User) => user.comments, {
    onDelete: 'SET NULL',
  })
  user: User;
}
