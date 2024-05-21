import { UserRoles } from './enums/roles';
import { UserStatus } from './enums/status';

export type IUser = {
  name: string;
  email: string;
  password: string;
  status?: UserStatus;
  roles?: UserRoles[];
  createdAt?: Date;
  updatedAt?: Date;
};
