import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('movies')
export class Movie {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  synopsis: string;

  @Column({ nullable: false })
  duration: number;

  @Column({ nullable: false })
  director: string;

  @Column({ type: 'int', nullable: false })
  year: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
