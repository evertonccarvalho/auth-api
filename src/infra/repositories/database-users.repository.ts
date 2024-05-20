import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserModel } from '@/domain/model/user';
import { UserRepository } from '@/domain/repositories/user.repository';
import { EmailIsTakenError, UserNotFoundError } from '../exceptions';
import { NotFoundError } from '@/domain/errors/not-found-error';
import { UserModelMapper } from '../http/users/dto/user-model.mapper';

@Injectable()
export class DatabaseUsersRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async insert(entity: UserEntity): Promise<void> {
    await this.userRepository.save(entity.toJSON());
  }

  async findByEmail(email: string): Promise<UserModel | undefined> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async emailExists(email: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      throw new EmailIsTakenError();
    }
  }

  async findById(id: string): Promise<UserEntity | undefined> {
    console.log('id no reposiroty', id);
    return this._get(id);
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async update(id: string, entity: UserEntity): Promise<UserEntity> {
    await this.findById(id); // Verifica se o usuário existe antes de atualizar
    const updatedUser = await this.userRepository.save({
      ...entity,
      id,
    });
    return updatedUser;
  }

  async delete(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new UserNotFoundError();
    }
  }

  protected async _get(id: string): Promise<UserModel | undefined> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundError(`UserModel not found using ID ${id}`);
      }
      return UserModelMapper.toEntity(user);
    } catch {
      throw new NotFoundError(`UserModel not found using ID ${id}`);
    }
  }
}
