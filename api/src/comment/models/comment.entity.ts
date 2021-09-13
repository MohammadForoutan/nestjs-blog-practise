import { Post } from '../../post/models/posts.entity';
import { User } from '../../user/models/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CommentStatus } from './comment-status.enum';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  body: string;

  @Column({ type: 'enum', default: CommentStatus.NOT_SET, enum: CommentStatus })
  status: CommentStatus;

  @ManyToOne(() => Post, (post: Post) => post.comments, { eager: false })
  post: Post;

  @ManyToOne(() => User, (user: User) => user.comments, {
    onDelete: 'SET NULL',
  })
  user: User;
}
