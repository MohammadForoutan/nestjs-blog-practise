import { User } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Advertise {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column()
  description: string;

  @Column()
  media: string;

  @ManyToOne(() => User, (user: User) => user.advertises)
  user: User;
}
