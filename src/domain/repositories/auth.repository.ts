import { UserEntity } from '../../domain/model/user';

export interface AuthRepository {
  insert(entity: UserEntity): Promise<void>;
  findByEmail(email: string): Promise<UserEntity | undefined>;
  emailExists(email: string): Promise<void>;
}
