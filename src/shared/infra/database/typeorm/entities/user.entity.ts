import { UserRoles } from '@/shared/infra/database/typeorm/enums/roles';
import { UserStatus } from '@/shared/infra/database/typeorm/enums/status';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  password: string;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.Pending,
    nullable: false,
  })
  status: UserStatus;

  @Column({
    type: 'enum',
    enum: UserRoles,
    default: UserRoles.User,
    nullable: false,
  })
  roles: UserRoles;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
