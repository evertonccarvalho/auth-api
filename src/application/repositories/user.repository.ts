import { UpdateUserDto } from '@/domain/dtos/users';
import { UserModel } from '../../domain/model/user';
import { RepositoryInterface } from '../contracts/repository.contract';

export interface UserRepository extends RepositoryInterface<UserModel> {
  findById(id: string): Promise<UserModel>;
  findAll(): Promise<UserModel[]>;
  update(id: string, data: UpdateUserDto): Promise<UserModel>;
  delete(id: string): Promise<void>;
}
