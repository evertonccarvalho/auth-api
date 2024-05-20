import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './http/users/users.controller';
import { UserEntity } from './entities/user.entity';
import { DatabaseUsersRepository } from './repositories/database-users.repository';
import { BcryptjsHashProvider } from './providers/bcrypt/bcryptjs-hash.provider';
import { SignupUseCase } from '@/domain/use-case/users/signup.usecase';
import { UserRepository } from '@/domain/repositories/user.repository';
import { HashProvider } from '@/domain/protocols/hash-provider';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [
    DatabaseUsersRepository,
    {
      provide: UserRepository,
      useClass: DatabaseUsersRepository,
    },
    {
      provide: HashProvider,
      useClass: BcryptjsHashProvider,
    },
    SignupUseCase.UseCase,
  ],
})
export class UsersModule {}
