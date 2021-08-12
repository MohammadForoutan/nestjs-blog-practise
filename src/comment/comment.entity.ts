import { User } from 'src/auth/user.entity';
import { Post } from 'src/posts/posts.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  body: string;

  @ManyToOne(() => Post, (post: Post) => post.comments, { eager: false })
  post: Post;

  @ManyToOne(() => User, (user: User) => user.comment, { eager: false })
  user: User;
}
