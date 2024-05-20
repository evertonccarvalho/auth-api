import { UserEntity } from '@/infra/entities/user.entity';
import { UserModel } from '../model/user';
import { RepositoryInterface } from '../protocols/repository-contracts';

export interface UserRepository extends RepositoryInterface<UserEntity> {
  findByEmail(email: string): Promise<UserModel | undefined>;
  emailExists(email: string): Promise<boolean>;
}
