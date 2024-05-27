import { User } from '@/shared/infra/database/typeorm/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
export class UserEntity extends User {
  constructor(props: Partial<UserEntity>) {
    super();
    Object.assign(this, {
      ...props,
      id: uuidv4(),
    });
  }
}
