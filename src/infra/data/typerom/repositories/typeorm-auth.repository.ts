import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { AuthRepository } from '@/application/repositories/auth.repository';
import {
  EmailIsTakenError,
  NotFoundErrorException,
} from '@/presentation/exceptions';

@Injectable()
export class TypeormAuthRepository implements AuthRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async insert(entity: UserEntity): Promise<void> {
    await this.userRepository.save(entity.toJSON());
  }

  async findByEmail(email: string): Promise<UserEntity | undefined> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundErrorException('User Not found');
    }
    return user;
  }

  async emailExists(email: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      throw new EmailIsTakenError();
    }
  }
}
