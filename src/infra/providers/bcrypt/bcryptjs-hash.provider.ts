import { HashProvider } from '@/domain/contracts/hash-provider.contract';
import { compare, hash } from 'bcrypt';

export class BcryptjsHashProvider implements HashProvider {
  async generateHash(payload: string): Promise<string> {
    return hash(payload, 6);
  }

  async compareHash(payload: string, hash: string): Promise<boolean> {
    return compare(payload, hash);
  }
}
