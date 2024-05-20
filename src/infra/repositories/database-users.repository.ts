import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserModel } from '@/domain/model/user';
import { UserRepository } from '@/domain/repositories/user.repository';
import { EmailIsTakenError, UserNotFoundError } from '../exceptions';
import { UserModelMapper } from '../http/users/dto/user-model.mapper';
import { UserOutputMapper } from '../http/users/dto/user-output.mapper';
import { UpdateUserDto } from '../http/users/dto';

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
      throw new UserNotFoundError();
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
    return this._get(id);
  }

  async findAll(): Promise<UserModel[]> {
    const users = await this.userRepository.find();
    return users.map((user) => UserModelMapper.toEntity(user));
  }

  async delete(id: string): Promise<void> {
    await this._get(id);
    await this.userRepository.delete(id);
  }

  async update(id: string, data: UpdateUserDto): Promise<UserEntity> {
    const userToUpdate = await this.findById(id);

    Object.assign(userToUpdate, data);

    const updatedUser = await this.userRepository.save(userToUpdate);
    return UserModelMapper.toEntity(updatedUser);
  }

  protected async _get(id: string): Promise<UserModel | undefined> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new UserNotFoundError();
      }
      return UserModelMapper.toEntity(user);
    } catch {
      throw new UserNotFoundError();
    }
  }
}
