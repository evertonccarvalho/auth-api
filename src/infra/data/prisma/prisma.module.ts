// import { Module } from '@nestjs/common';
// import { PrismaService } from './prisma.service';
// import { ConfigService } from '@nestjs/config';
// import { MovieRepository } from '@/application/repositories/movie.repositoy';
// import { TypeormMoviesRepository } from '../typerom/repositories/typeorm-movies.repository';
// import { AuthRepository } from '@/application/repositories/auth.repository';
// import { UserRepository } from '@/application/repositories/user.repository';
// import { PrismaAuthRepository } from './repositories/prisma-auth.repository';
// import { PrismaUsersRepository } from './repositories/prisma-users.repository';
// import { PrismaMoviesRepository } from './repositories/prisma-movies.repository';

// @Module({
//   imports: [],
//   providers: [
//     PrismaService,
//     {
//       provide: 'IUserRepository',
//       useClass: PrismaUsersRepository,
//     },
//     {
//       provide: 'IMovieRepository',
//       useClass: PrismaMoviesRepository,
//     },
//     {
//       provide: 'IAuthRepository',
//       useClass: PrismaAuthRepository,
//     },
//   ],
//   exports: [
//     PrismaService,
//     'IAuthRepository',
//     'IUserRepository',
//     'IMovieRepository',
//   ],
// })
// export class PrismaModule {}
