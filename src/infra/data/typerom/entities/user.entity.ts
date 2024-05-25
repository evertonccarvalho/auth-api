import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  BaseEntity,
  PrimaryColumn,
} from 'typeorm';
import { UserRoles } from '@/domain/enums/roles';
import { UserStatus } from '@/domain/enums/status';

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
