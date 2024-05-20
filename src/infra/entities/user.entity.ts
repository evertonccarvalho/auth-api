import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '@/infra/utils/enums/roles';
import { UserStatus } from '@/infra/utils/enums/status';
import { BaseEntity } from '@/domain/entities/entity';

interface UserProps {
  name: string;
  email: string;
  password: string;
  status: UserStatus;
  roles: Role[];
}

@Entity('users')
export class UserEntity extends BaseEntity<UserProps> {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

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

  constructor(props: UserProps, id?: string) {
    super(props, id);
    this._id = id; // Aqui, utilizamos _id como a coluna primária
  }

  get id() {
    return this._id; // Definimos um getter para 'id' que retorna '_id'
  }
}
