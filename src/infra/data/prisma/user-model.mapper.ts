import { UserModel } from '@/domain/model/user';
import { User } from '@prisma/client';
import { ValidationError } from 'class-validator';

export class UserModelMapper {
  static toEntity(model: User) {
    const data = {
      name: model.name,
      email: model.email,
      password: model.password,
      createdAt: model.createdAt,
    };

    try {
      return new UserModel(data, model.id);
    } catch {
      throw new ValidationError();
    }
  }
}
