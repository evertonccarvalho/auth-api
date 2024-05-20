import { ValidationError } from '@/domain/errors/validation-error';
import { UserModel } from '@/domain/model/user';

export class UserModelMapper {
  static toEntity(model: UserModel) {
    const data = {
      name: model.name,
      email: model.email,
      password: model.password,
      status: model.status,
      roles: model.roles,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    };

    try {
      return new UserModel(data, model.id);
    } catch {
      throw new ValidationError('An entity could not be loaded');
    }
  }
}
