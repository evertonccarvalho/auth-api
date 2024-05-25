import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1716670484659 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE users_status_enum AS ENUM ('Pending', 'Active', 'Inactive');
      CREATE TYPE users_roles_enum AS ENUM ('user', 'admin');

      CREATE TABLE users (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        name varchar(255) NOT NULL,
        email varchar(255) NOT NULL UNIQUE,
        password varchar(255) NOT NULL,
        status users_status_enum DEFAULT 'Pending',
        roles users_roles_enum DEFAULT 'user',
        created_at timestamp DEFAULT now() NOT NULL,
        updated_at timestamp DEFAULT now() NOT NULL
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE users;
      DROP TYPE users_status_enum;
      DROP TYPE users_roles_enum;
    `);
  }
}
