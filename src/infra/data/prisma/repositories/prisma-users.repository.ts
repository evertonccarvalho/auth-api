// import { Injectable } from '@nestjs/common';
// import { UserRepository } from '@/application/repositories/user.repository';
// import { UpdateUserDto } from '@/domain/dtos/users';
// import { NotFoundErrorException } from '@/presentation/exceptions/not-found-error.exception';
// import { PrismaService } from '../prisma.service';
// import { UserModel } from '@/domain/model/user';
// import { UserModelMapper } from '../user-model.mapper';

// @Injectable()
// export class PrismaUsersRepository implements UserRepository {
//   constructor(private prismaService: PrismaService) {}

//   async findById(id: string): Promise<UserModel | undefined> {
//     return this._get(id);
//   }

//   async findAll(): Promise<UserModel[]> {
//     const users = await this.prismaService.user.findMany();
//     return users;
//   }

//   async update(id: string, data: UpdateUserDto): Promise<UserModel> {
//     // Encontra o usuário pelo ID
//     const entity = await this.findById(id);

//     // Atualiza os dados do usuário com os fornecidos
//     Object.assign(entity, data);

//     // Prepara os dados a serem atualizados no banco de dados
//     const updateData = {
//       name: entity.name,
//       email: entity.email,
//       password: entity.password,
//       status: entity.status,
//     };

//     // Atualiza o usuário no banco de dados usando o Prisma
//     const updatedUser = await this.prismaService.user.update({
//       data: updateData,
//       where: { id: entity.id },
//     });

//     // Converte o usuário retornado pelo Prisma para o modelo de usuário antes de retorná-lo
//     return UserModelMapper.toEntity(updatedUser);
//   }

//   async delete(id: string): Promise<void> {
//     await this._get(id);
//     await this.prismaService.user.delete({ where: { id } });
//   }

//   protected async _get(id: string): Promise<UserModel | undefined> {
//     try {
//       const user = await this.prismaService.user.findUnique({ where: { id } });
//       if (!user) {
//         throw new NotFoundErrorException('User Not found');
//       }
//       return UserModelMapper.toEntity(user);
//     } catch {
//       throw new NotFoundErrorException('User Not found');
//     }
//   }
// }
