import { UserOutput } from '@/application/dtos/users/user-output';
import { UserModel } from '../../domain/model/user';

export interface AuthRepository {
  insert(entity: UserModel): Promise<void>;
  findByEmail(email: string): Promise<UserModel | undefined>;
  emailExists(email: string): Promise<void>;
}
