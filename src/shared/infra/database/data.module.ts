import { DynamicModule, Module } from '@nestjs/common';
import { TypeormAuthRepository } from '../../../features/auth/infra/repositories/typeorm-auth.repository';
import { TypeormMoviesRepository } from '../../../features/movies/infra/repositories/typeorm-movies.repository';
import { TypeormUsersRepository } from '../../../features/users/infra/repositories/typeorm-users.repository';
import { TypeOrmDatabaseModule } from './typeorm/typeorm.module';

interface DatabaseOptions {
  type: 'prisma' | 'mongoose' | 'typeorm';
  global?: boolean;
}

@Module({})
export class DataModule {
  static register(options: DatabaseOptions): DynamicModule {
    const { type, global = false } = options;

    let imports = [];
    let providers = [];
    let exports = [];

    switch (type) {
      case 'typeorm':
        imports = [TypeOrmDatabaseModule];
        providers = [
          {
            provide: 'UserRepository',
            useClass: TypeormUsersRepository,
          },
          {
            provide: 'MovieRepository',
            useClass: TypeormMoviesRepository,
          },
          {
            provide: 'AuthRepository',
            useClass: TypeormAuthRepository,
          },
        ];
        exports = ['UserRepository', 'MovieRepository', 'AuthRepository'];
        break;

      default:
        throw new Error('Unsupported database type');
    }

    return {
      global,
      module: DataModule,
      imports,
      providers,
      exports,
    };
  }
}
