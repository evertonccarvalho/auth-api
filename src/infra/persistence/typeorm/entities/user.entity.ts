import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserRoles } from '@/domain/interfaces/enums/roles';
import { UserStatus } from '@/domain/interfaces/enums/status';
import { BaseEntity } from '@/application/entities/base-entity';
import { IUser } from '../../../../domain/interfaces/user';

@Entity('users')
export class UserEntity extends BaseEntity<IUser> {
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
