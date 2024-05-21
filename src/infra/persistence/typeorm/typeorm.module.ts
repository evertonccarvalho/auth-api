import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { IMovieRepository } from '@/application/repositories/movie.repositoy';
import { TypeormMoviesRepository } from './repositories/typeorm-movies.repository';
import { IUserRepository } from '@/application/repositories/user.repository';
import { TypeormUsersRepository } from './repositories/typeorm-users.repository';
import { IAuthRepository } from '@/application/repositories/auth.repository';
import { TypeormAuthRepository } from './repositories/typeorm-auth.repository';
import { IBcryptService } from '@/application/contracts/hash-provider.contract';
import { BcryptService } from '@/infra/cryptography/bcrypt/bcrypt.service';
import { JwtTokenService } from '@/infra/cryptography/jwt/jwt.service';
import { UserEntity } from './entities/user.entity';
import { MovieEntity } from './entities/movie.entity';
import { JwtModule } from '@/infra/cryptography/jwt/jwt.module';

export const getTypeOrmModuleOptions = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get('DB.host'),
  port: +configService.get<number>('DB.port'),
  username: configService.get('DB.username'),
  password: configService.get('DB.password'),
  database: configService.get('DB.database'),
  entities: [UserEntity, MovieEntity],
  synchronize: true,
  logging: false,
});

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeOrmModuleOptions,
    }),
    TypeOrmModule.forFeature([UserEntity, MovieEntity]),
  ],
  providers: [
    {
      provide: IUserRepository,
      useClass: TypeormUsersRepository,
    },
    {
      provide: IMovieRepository,
      useClass: TypeormMoviesRepository,
    },
    {
      provide: IAuthRepository,
      useClass: TypeormAuthRepository,
    },
  ],
  exports: [IAuthRepository, IUserRepository, IMovieRepository],
})
export class TypeOrmDatabaseModule {}
