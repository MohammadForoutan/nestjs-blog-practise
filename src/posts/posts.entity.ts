import { IsNotEmpty } from 'class-validator';
import { User } from 'src/auth/user.entity';
import { Comment } from 'src/comment/comment.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty()
  title: string;

  @Column()
  body: string;

  @Column()
  isPublish: boolean;

  @ManyToOne(() => User, (user) => user.post)
  user: User;

  @OneToMany(() => Comment, (comment: Comment) => comment.post)
  comments: Comment[];
}
