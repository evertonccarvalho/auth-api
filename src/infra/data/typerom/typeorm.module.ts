import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeormMoviesRepository } from './repositories/typeorm-movies.repository';
import { TypeormUsersRepository } from './repositories/typeorm-users.repository';
import { TypeormAuthRepository } from './repositories/typeorm-auth.repository';
import { User } from './entities/user.entity';
import { Movie } from './entities/movie.entity';
import { DataSource } from 'typeorm';
import { join } from 'path';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: DataSource,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const dataSource = new DataSource({
          type: 'postgres',
          host: configService.get('DB.host'),
          port: +configService.get<number>('DB.port'),
          username: configService.get('DB.username'),
          password: configService.get('DB.password'),
          database: configService.get('DB.database'),
          entities: [
            join(__dirname, '..', '**', 'entities', '*.entity.{ts,js}'),
          ],
          migrations: [join(__dirname, '..', '**', 'migrations', '*.{ts,js}')],
          synchronize: true,
          logging: false,
        });

        try {
          await dataSource.initialize();
          console.log('Database connected successfully');
          return dataSource;
        } catch (error) {
          console.error('Error connecting to database', error);
          throw error;
        }
      },
    },
  ],
  exports: [DataSource],
})
export class TypeOrmDatabaseModule {}

// @Module({
//   imports: [ConfigModule],
//   providers: [
//     {
//       provide: DataSource,
//       inject: [ConfigService],
//       useFactory: async (configService: ConfigService) => {
//         const dataSource = new DataSource({
//           type: 'postgres',
//           host: configService.get('DB.host'),
//           port: +configService.get<number>('DB.port'),
//           username: configService.get('DB.username'),
//           password: configService.get('DB.password'),
//           database: configService.get('DB.database'),
//           entities: [`${__dirname}/entities/*.entity.{ts,js}'`],
//           migrations: [`${__dirname}/migrations/{.ts,*.js}`],
//           migrationsRun: true,
//           synchronize: false,
//           logging: false,
//         });

//         try {
//           await dataSource.initialize();
//           console.log('Database connected successfully');
//           return dataSource;
//         } catch (error) {
//           console.error('Error connecting to database', error);
//           throw error;
//         }
//       },
//     },
//   ],
//   exports: [DataSource],
// })
// export class TypeOrmDatabaseModule {}
