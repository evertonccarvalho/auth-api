import { UserRoles } from '@/domain/enums/roles';
import { UserStatus } from '@/domain/enums/status';

export class UserModel {
  id?: string;
  name: string;
  email: string;
  password?: string;
  status?: UserStatus;
  roles?: UserRoles[];
  createdAt?: Date;
  updatedAt?: Date;

  constructor(props: Partial<UserModel> = {}) {
    this.id = props.id;
    this.name = props.name!;
    this.email = props.email!;
    this.password = props.password;
    this.status = props.status ?? UserStatus.Active;
    this.roles = props.roles ?? [];
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }
}
