import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { EmailIsTakenError } from '@/presentation/exceptions';
import { NotFoundErrorException } from '@/presentation/exceptions/not-found-error.exception';
import { IAuthRepository } from '@/application/repositories/auth.repository';

@Injectable()
export class TypeormAuthRepository implements IAuthRepository {
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
