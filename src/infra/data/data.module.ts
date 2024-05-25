import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmDatabaseModule } from './typerom/typeorm.module';
import { TypeormUsersRepository } from './typerom/repositories/typeorm-users.repository';
import { TypeormMoviesRepository } from './typerom/repositories/typeorm-movies.repository';
import { TypeormAuthRepository } from './typerom/repositories/typeorm-auth.repository';

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
