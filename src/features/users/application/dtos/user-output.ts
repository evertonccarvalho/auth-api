import { UserRoles } from '@/shared/infra/database/typeorm/enums/roles';
import { UserStatus } from '@/shared/infra/database/typeorm/enums/status';
import { UserEntity } from '../../domain/entities/user';

export type UserProps = {
  // id: string;
  name: string;
  email: string;
  password: string;
  roles: UserRoles;
  status: UserStatus;
  createdAt?: Date;
  updatedAt?: Date;
};

export class UserOutputMapper {
  static toOutput(entity: UserEntity): UserProps {
    return entity;
  }
}
