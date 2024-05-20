import { UserEntity } from '@/infra/entities/user.entity';
import { Role } from '@/infra/utils/enums/roles';
import { UserStatus } from '@/infra/utils/enums/status';

export class UserModel {
  id: string;
  name: string;
  email: string;
  password: string;
  status: UserStatus;
  roles: Role[];
  createdAt: Date;
  updatedAt: Date;

  constructor(props: UserEntity) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.status = props.status;
    this.roles = props.roles;
  }
}
