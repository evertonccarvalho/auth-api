import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmDatabaseModule } from './typeorm/typeorm.module';

interface DatabaseOptions {
  type: 'prisma' | 'mongoose' | 'typeorm';
  global?: boolean;
}

@Module({})
export class PersistenceModule {
  static register(options: DatabaseOptions): DynamicModule {
    const { type, global = false } = options;

    let imports = [];
    let exports = [];

    switch (type) {
      case 'typeorm':
        imports = [TypeOrmDatabaseModule];
        exports = [TypeOrmDatabaseModule];
        break;
      default:
        throw new Error('Unsupported database type');
    }

    return {
      global,
      module: PersistenceModule,
      imports: imports,
      exports: exports,
    };
  }
}
