import { UpdateUserDto } from '@/features/users/infra/dtos';
import { RepositoryInterface } from '../../../../shared/domain/repositories/repository.contract';
import { UserEntity } from '../entities/user';

export interface UserRepository extends RepositoryInterface<UserEntity> {
  findById(id: string): Promise<UserEntity>;
  findAll(): Promise<UserEntity[]>;
  update(id: string, data: UpdateUserDto): Promise<UserEntity>;
  delete(id: string): Promise<void>;
}
