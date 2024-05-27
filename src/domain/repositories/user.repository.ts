import { UpdateUserDto } from '@/presentation/dtos/users';
import { RepositoryInterface } from '../../shared/domain/repositories/repository.contract';
import { UserEntity } from '../model/user';

export interface UserRepository extends RepositoryInterface<UserEntity> {
  findById(id: string): Promise<UserEntity>;
  findAll(): Promise<UserEntity[]>;
  update(id: string, data: UpdateUserDto): Promise<UserEntity>;
  delete(id: string): Promise<void>;
}
