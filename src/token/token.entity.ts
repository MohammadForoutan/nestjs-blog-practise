import { Column, CreateDateColumn, Entity } from 'typeorm';

@Entity()
export class Token {
  @Column({ primary: true })
  tokenValue: string;

  @CreateDateColumn()
  createdAt: Date;
}
