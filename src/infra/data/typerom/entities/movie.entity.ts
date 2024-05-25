import { BaseEntity } from '@/domain/entities/base-entity';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('movies')
export class Movie {
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
