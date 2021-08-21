import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
