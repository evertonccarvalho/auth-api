import { UserRoles } from '@/infra/interfaces/enums/roles';
import { UserStatus } from '@/infra/interfaces/enums/status';

export class UserOutput {
  id: string;
  name: string;
  email: string;
  status?: UserStatus;
  roles?: UserRoles[];
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
