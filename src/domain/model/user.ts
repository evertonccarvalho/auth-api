import { UserRoles } from '@/domain/enums/roles';
import { UserStatus } from '@/domain/enums/status';
import { UserEntity } from '@/infra/data/typerom/entities/user.entity';

export class UserModel extends UserEntity {
  constructor(props: Partial<UserModel>) {
    super();
    Object.assign(this, props);
  }
}
