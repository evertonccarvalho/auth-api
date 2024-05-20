import { Role } from './enums/roles';
import { UserStatus } from './enums/status';

export type IUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  status?: UserStatus;
  roles?: Role[];
  createdAt?: Date;
  updatedAt?: Date;
};
