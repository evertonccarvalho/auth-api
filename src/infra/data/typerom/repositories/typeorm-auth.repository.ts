import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { AuthRepository } from '@/application/contracts/auth.repository';
import {
  EmailIsTakenError,
  NotFoundErrorException,
} from '@/shared/application/exceptions';
import { UserEntity } from '@/domain/model/user';

@Injectable()
export class TypeormAuthRepository implements AuthRepository {
  private readonly userRepository: Repository<User>;
  constructor(private readonly dataSource: DataSource) {
    this.userRepository = this.dataSource.getRepository(User);
  }

  async insert(entity: UserEntity): Promise<void> {
    await this.userRepository.save(entity);
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
