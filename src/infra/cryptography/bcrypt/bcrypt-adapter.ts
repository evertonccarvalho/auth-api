import { HashProvider } from '@/application/contracts/hasher.contract';
import bcrypt from 'bcrypt';

export class BcryptHashProvider implements HashProvider {
  constructor(private readonly salt: number) {}
  generateHash(payload: string): Promise<string> {
    return bcrypt.hash(payload, this.salt);
  }
  compareHash(payload: string, hash: string): Promise<boolean> {
    return bcrypt.compare(payload, hash);
  }
}
