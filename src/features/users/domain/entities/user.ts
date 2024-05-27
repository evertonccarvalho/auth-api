import { User } from '@/shared/infra/database/typeorm/entities/user.entity';
import { UserRoles } from '@/shared/infra/database/typeorm/enums/roles';
import { UserStatus } from '@/shared/infra/database/typeorm/enums/status';
import { v4 as uuidv4 } from 'uuid';

export type UserProps = {
  name: string;
  email: string;
  password: string;
  roles: UserRoles;
  status: UserStatus;
  createdAt?: Date;
  updatedAt?: Date;
};

export class UserEntity extends User {
  constructor(props: Partial<UserEntity>) {
    super();
    Object.assign(this, {
      ...props,
      id: uuidv4(),
    });
  }
}
