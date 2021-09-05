import { Comment } from '../comment/comment.entity';
import { Post } from '../post/posts.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { View } from 'src/view/view.entity';
import { Advertise } from 'src/advertise/advertise.entity';

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
  comments: Comment[];

  @OneToMany(() => View, (view: View) => view.user)
  views: View[];

  @OneToMany(() => Advertise, (advertise: Advertise) => advertise.user, {
    onDelete: 'SET NULL',
  })
  advertises: Advertise[];
}
