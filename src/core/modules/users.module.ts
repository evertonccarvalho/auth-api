// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { UsersController } from '../../presentation/controllers/users.controller';
// import { UserEntity } from '../../infra/persistence/typeorm/entities/user.entity';
// import { IUserRepository } from '@/application/repositories/user.repository';
// import { TypeormUsersRepository } from '../../infra/persistence/typeorm/repositories/typeorm-users.repository';
// import {
//   DeleteUserUseCase,
//   GetUserUseCase,
//   ListUsersUseCase,
//   UpdateUserUseCase,
// } from '@/application/use-case/users';

// @Module({
//   imports: [TypeOrmModule.forFeature([UserEntity])],
//   controllers: [UsersController],
//   providers: [
//     GetUserUseCase.UseCase,
//     ListUsersUseCase.UseCase,
//     UpdateUserUseCase.UseCase,
//     DeleteUserUseCase.UseCase,
//   ],
// })
// export class UsersModule {}
