import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  BaseEntity,
} from 'typeorm';
import { UserRoles } from '@/domain/enums/roles';
import { UserStatus } from '@/domain/enums/status';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  password: string;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.Pending,
  })
  status: UserStatus;

  @Column({
    type: 'simple-array',
    default: [UserRoles.User],
  })
  roles: UserRoles[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
