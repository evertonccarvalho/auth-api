import { Role } from '@/infra/utils/enums/roles';
import { UserStatus } from '@/infra/utils/enums/status';

export class UserOutput {
  id: string;
  name: string;
  email: string;
  status: UserStatus;
  roles: Role[];
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
