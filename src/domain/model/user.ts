import { UserRoles } from '@/domain/enums/roles';
import { UserStatus } from '@/domain/enums/status';
import { User } from '@/infra/data/typerom/entities/user.entity';

export class UserModel extends User {
  constructor(props: Partial<UserModel>) {
    super();
    Object.assign(this, props);
  }
}
