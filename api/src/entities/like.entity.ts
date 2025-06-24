import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cat_id: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, user => user.likes)
  user: User;

  @Column()
  userId: number;
} 