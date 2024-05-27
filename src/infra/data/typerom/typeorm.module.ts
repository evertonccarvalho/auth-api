import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { join } from 'path';
import { EnvConfigService } from '@/main/config/env-config/env-config.service';
import { EnvConfigModule } from '@/main/config/env-config/env-config.module';

@Module({
  imports: [EnvConfigModule],
  providers: [
    {
      provide: DataSource,
      inject: [EnvConfigService],
      useFactory: async (configService: EnvConfigService) => {
        const dataSource = new DataSource({
          type: 'postgres',
          host: configService.getDbHost(),
          port: configService.getDbPort(),
          username: configService.getDbUsername(),
          password: configService.getDbPassword(),
          database: configService.getDbDatabaseName(),
          entities: [
            join(__dirname, '..', '**', 'entities', '*.entity.{ts,js}'),
          ],
          migrations: [join(__dirname, '..', '**', 'migrations', '*.{ts,js}')],
          migrationsRun: true,
          synchronize: false,
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
