import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('movies')
export class MovieEntity {
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

  @BeforeInsert()
  generetedId() {
    if (this.id) {
      return;
    }
    this.id = uuidv4();
  }

  // constructor(partialEntity: Partial<MovieEntity>) {
  //   Object.assign(this, partialEntity);
  // }

  // static create({
  //   director,
  //   duration,
  //   id,
  //   synopsis,
  //   title,
  //   year,
  // }: MovieEntity): MovieEntity {
  //   return new MovieEntity({
  //     director,
  //     duration,
  //     id,
  //     synopsis,
  //     title,
  //     year,
  //   });
  // }
}
