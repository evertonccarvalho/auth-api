import { UserModel } from '../../domain/model/user';

export abstract class IAuthRepository {
  abstract insert(data: UserModel): Promise<void>;
  abstract findByEmail(email: string): Promise<UserModel | undefined>;
  abstract emailExists(email: string): Promise<void>;
}
