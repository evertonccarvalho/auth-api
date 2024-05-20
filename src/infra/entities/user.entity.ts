import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '@/infra/interfaces/enums/roles';
import { UserStatus } from '@/infra/interfaces/enums/status';
import { BaseEntity } from '@/domain/entities/entity';

export type UserProps = {
  name: string;
  email: string;
  password: string;
  status?: UserStatus;
  roles?: Role[];
  createdAt?: Date;
  updatedAt?: Date;
};

@Entity('users')
export class UserEntity extends BaseEntity<UserProps> {
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
    default: [Role.User],
  })
  roles: Role[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
