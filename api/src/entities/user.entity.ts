import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Like } from './like.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  login: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  authToken: string;

  @OneToMany(() => Like, like => like.user)
  likes: Like[];
} 