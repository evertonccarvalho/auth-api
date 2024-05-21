import { BaseEntity } from '../entities/entity';
import { UserRoles } from '@/infra/interfaces/enums/roles';
import { UserStatus } from '@/infra/interfaces/enums/status';
import { IUser } from '@/infra/interfaces/user';

export class UserModel extends BaseEntity<IUser> {
  id: string;
  name: string;
  email: string;
  password: string;
  status: UserStatus;
  roles: UserRoles[];
  createdAt: Date;
  updatedAt: Date;

  constructor(props: IUser, id?: string) {
    super(props, id);

    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.status = props.status;
    this.roles = props.roles;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;

    Object.assign(this, props);
  }
}
