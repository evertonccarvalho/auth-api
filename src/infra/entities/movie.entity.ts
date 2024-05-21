import { BaseEntity } from '@/domain/entities/entity';
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import { IMovies } from '../../domain/interfaces/movie';

@Entity('movies')
export class MovieEntity extends BaseEntity<IMovies> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  synopsis: string;

  @Column()
  duration: number;

  @Column()
  director: string;

  @Column({ type: 'int', default: 0 })
  year: number;
}
