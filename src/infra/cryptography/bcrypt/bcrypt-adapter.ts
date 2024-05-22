import { IBcryptService } from '@/application/contracts/hash-provider.contract';
import bcrypt from 'bcrypt';

export class BcryptAdapter implements IBcryptService {
  constructor(private readonly salt: number) {}
  generateHash(payload: string): Promise<string> {
    return bcrypt.hash(payload, this.salt);
  }
  compareHash(payload: string, hash: string): Promise<boolean> {
    return bcrypt.compare(payload, hash);
  }
}
