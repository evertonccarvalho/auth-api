import { UserModel } from '../../domain/model/user';

export interface AuthRepository {
  insert(data: UserModel): Promise<void>;
  findByEmail(email: string): Promise<UserModel | undefined>;
  emailExists(email: string): Promise<void>;
}
