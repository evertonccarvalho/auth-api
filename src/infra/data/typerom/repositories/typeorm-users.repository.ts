import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from '@/domain/dtos/users';
import { NotFoundErrorException } from '@/presentation/exceptions/not-found-error.exception';

@Injectable()
export class TypeormUsersRepository {
  private readonly userRepository: Repository<User>;
  constructor(private readonly dataSource: DataSource) {
    this.userRepository = this.dataSource.getRepository(User);
  }

  async findById(id: string): Promise<User | undefined> {
    return this._get(id);
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    const entity = await this._get(id);
    Object.assign(entity, data);
    return this.userRepository.save(entity);
  }

  async delete(id: string): Promise<void> {
    await this._get(id);
    await this.userRepository.delete(id);
  }

  private async _get(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundErrorException(`User with id ${id} not found`);
    }
    return user;
  }
}
