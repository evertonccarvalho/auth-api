import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMovieTable1716670496842 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE movies (
        id uuid PRIMARY KEY NOT NULL,
        title varchar(255) NOT NULL,
        director varchar(255) NOT NULL,
        synopsis text NOT NULL,
        duration int NOT NULL,
        year int NOT NULL,
        created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE movies;
    `);
  }
}
