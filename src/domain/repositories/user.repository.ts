import { UpdateUserDto } from '@/infra/http/users/dto';
import { UserModel } from '../model/user';

export abstract class UserRepository {
  abstract insert(data: UserModel): Promise<void>;
  abstract findById(id: string): Promise<UserModel>;
  abstract findAll(): Promise<UserModel[]>;
  abstract update(id: string, data: UpdateUserDto): Promise<UserModel>;
  abstract delete(id: string): Promise<void>;
  abstract findByEmail(email: string): Promise<UserModel | undefined>;
  abstract emailExists(email: string): Promise<void>;
}
