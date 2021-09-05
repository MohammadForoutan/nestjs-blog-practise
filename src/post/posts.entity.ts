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
import { View } from 'src/view/view.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  body: string;

  @Column({ default: null })
  isPublish: boolean;

  // @Column({ type: 'array', default: [] })
  // likes: User[];

  @Column({ default: 0 })
  like_count: number;

  @Column({ default: 0 })
  view_count: number;

  @ManyToOne(() => User, (user) => user.post, { eager: false })
  user: User;

  @OneToMany(() => Comment, (comment: Comment) => comment.post)
  comments: Comment[];

  @ManyToMany(() => Tag, { cascade: true })
  @JoinTable()
  tags: Tag[];

  @ManyToMany(() => User)
  @JoinTable()
  likes: User[];

  @OneToMany(() => View, (view: View) => view.post, { onDelete: 'CASCADE' })
  views: View[];

  /*
    like_count & like & views column should be added.
    views will be detected with ip address and like with user(uuid)
    for better performance & count likes we should add like_count column
  */
}
