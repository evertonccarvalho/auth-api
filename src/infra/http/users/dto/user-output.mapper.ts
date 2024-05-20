import { UserModel } from '@/domain/model/user';
import { UserOutput } from './user-output';

export class UserOutputMapper {
  static toOutput(entity: UserModel): UserOutput {
    return entity.toJSON();
  }
}
