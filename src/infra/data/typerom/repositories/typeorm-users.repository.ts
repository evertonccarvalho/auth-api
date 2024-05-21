import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserRepository } from '@/application/repositories/user.repository';
import { UserEntity } from '../entities/user.entity';
import { UpdateUserDto } from '@/domain/dtos/users';
import { NotFoundErrorException } from '@/presentation/exceptions/not-found-error.exception';

@Injectable()
export class TypeormUsersRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findById(id: string): Promise<UserEntity | undefined> {
    return this._get(id);
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async update(id: string, data: UpdateUserDto): Promise<UserEntity> {
    const entity = await this.findById(id);

    Object.assign(entity, data);

    const updatedUser = await this.userRepository.save(entity);
    return updatedUser;
  }

  async delete(id: string): Promise<void> {
    await this._get(id);
    await this.userRepository.delete(id);
  }

  protected async _get(id: string): Promise<UserEntity | undefined> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundErrorException('User Not found');
      }
      return user;
    } catch {
      throw new NotFoundErrorException('User Not found');
    }
  }
}
