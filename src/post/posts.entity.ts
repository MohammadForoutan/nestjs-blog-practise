import { IsNotEmpty } from 'class-validator';
import { User } from '../user/user.entity';
import { Comment } from '../comment/comment.entity';
import { Tag } from '../tag/tag.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
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

  // @Column({ type: 'array', default: [] })
  // likes: User[];

  @Column({ default: 0 })
  like_count: number;

  // @Column({ type: 'cidr' }) // cidr - ip data in postgresql
  // views: string[]; // implement this field later

  @ManyToOne(() => User, (user) => user.post)
  user: User;

  @OneToMany(() => Comment, (comment: Comment) => comment.post)
  comments: Comment[];

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];

  /*
    like_count & like & views column should be added.
    views will be detected with ip address and like with user(uuid)
    for better performance & count likes we should add like_count column
  */
}
