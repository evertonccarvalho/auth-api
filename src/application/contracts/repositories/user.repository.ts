import { UpdateUserDto } from '@/infra/http/users/dto';
import { UserModel } from '../../../domain/model/user';

export abstract class IUserRepository {
  abstract insert(data: UserModel): Promise<void>;
  abstract findAll(): Promise<UserModel[]>;
  abstract findById(id: string): Promise<UserModel>;
  abstract update(id: string, data: UpdateUserDto): Promise<UserModel>;
  abstract delete(id: string): Promise<void>;
  abstract findByEmail(email: string): Promise<UserModel | undefined>;
  abstract emailExists(email: string): Promise<void>;
}
