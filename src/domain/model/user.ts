import { User } from '@/infra/data/typerom/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
export class UserModel extends User {
  constructor(props: Partial<UserModel>) {
    super();
    Object.assign(this, {
      ...props,
      id: uuidv4(),
    });
  }
}
