import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Error {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @Column()
  stack: string;
}
