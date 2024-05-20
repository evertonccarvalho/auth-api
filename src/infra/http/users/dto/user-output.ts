import { UserModel } from '@/domain/model/user';
import { UserEntity } from '@/infra/entities/user.entity';

export type UserOutput = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export class UserOutputMapper {
  static toOutput(entity: UserModel): UserOutput {
    return entity.toJSON();
  }
}
