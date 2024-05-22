import { UpdateUserDto } from '@/domain/dtos/users';
import { UserModel } from '../../domain/model/user';

export interface IUserRepository {
  findById(id: string): Promise<UserModel>;
  findAll(): Promise<UserModel[]>;
  update(id: string, data: UpdateUserDto): Promise<UserModel>;
  delete(id: string): Promise<void>;
}
