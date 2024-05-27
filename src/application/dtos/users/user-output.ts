import { UserRoles } from '@/domain/enums/roles';
import { UserStatus } from '@/domain/enums/status';
import { UserEntity } from '@/domain/model/user';

export type UserOutput = {
  id: string;
  name: string;
  email: string;
  password: string;
  roles: UserRoles;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
};

export class UserOutputMapper {
  static toOutput(entity: UserEntity): UserOutput {
    return entity;
  }
}
