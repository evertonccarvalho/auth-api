import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IAuthRepository } from '@/application/repositories/auth.repository';
import {
  EmailIsTakenError,
  NotFoundErrorException,
} from '@/presentation/exceptions';
import { PrismaService } from '../prisma.service';
import { UserModel } from '@/domain/model/user';
import { UserEntity } from '../../typerom/entities/user.entity';
import { IUser } from '@/domain/interfaces/user';
import { UserModelMapper } from '../user-model.mapper';
import { User } from '@prisma/client';

@Injectable()
export class PrismaAuthRepository implements IAuthRepository {
  constructor(private prismaService: PrismaService) {}

  async insert(entity: UserModel): Promise<void> {
    const data = {
      name: entity.name,
      email: entity.email,
      password: entity.password,
      status: entity.status,
    };
    await this.prismaService.user.create({
      data: data,
    });
  }

  async findByEmail(email: string): Promise<UserEntity> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { email },
      });
      return UserModelMapper.toEntity(user);
    } catch {
      throw new NotFoundErrorException('User Not found');
    }
  }

  async emailExists(email: string): Promise<void> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });
    if (user) {
      throw new EmailIsTakenError();
    }
  }
}