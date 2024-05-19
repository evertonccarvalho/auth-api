import { Role } from '@/core/utils/enums/roles';
import { UserStatus } from '@/core/utils/enums/status';
import { UUID } from '@/core/utils/libs/id';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn('uuid')
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
    default: ['user'],
  })
  roles: Role[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  generetedId() {
    this.id = UUID.generate();
  }
}
