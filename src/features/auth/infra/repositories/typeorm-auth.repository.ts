import { UserEntity } from '@/features/users/domain/entities/user';
import { User } from '@/shared/infra/database/typeorm/entities/user.entity';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { AuthRepository } from '../../domain/repositories/auth.repository';

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
    const entity = await this.userRepository.findOne({ where: { email } });
    if (!entity) {
      throw new NotFoundException('User Not found');
    }
    return entity;
  }

  async emailExists(email: string): Promise<void> {
    const entity = await this.userRepository.findOne({ where: { email } });
    if (entity) {
      throw new ConflictException(
        'The email provided is already associated with an existing account',
      );
    }
  }
}
