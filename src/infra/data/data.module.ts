import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmDatabaseModule } from './typerom/typeorm.module';
import { BcryptService } from '../cryptography/bcrypt/bcrypt.service';

interface DatabaseOptions {
  type: 'prisma' | 'mongoose' | 'typeorm';
  global?: boolean;
}

@Module({})
export class DataModule {
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
      module: DataModule,
      imports: imports,
      exports: exports,
    };
  }
}
