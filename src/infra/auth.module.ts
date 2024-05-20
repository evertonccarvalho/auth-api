// import { Module } from '@nestjs/common';
// import { AuthService } from './services/auth.service';
// import { PassportModule } from '@nestjs/passport';
// import { JwtModule, JwtService } from '@nestjs/jwt';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { UserEntity } from '@/infra/entities/user.entity';
// import { AuthRepository } from './repositories/auth.repository';
// import { AuthController } from './http/auth/auth.controller';
// import { BcryptjsHashProvider } from './providers/bcrypt/bcryptjs-hash.provider';
// import { JwtStrategy } from '@/infra/strategies/jwt.estrategy';
// @Module({
//   imports: [
//     TypeOrmModule.forFeature([UserEntity]),
//     PassportModule,
//     JwtModule.register({
//       secret: process.env.JWT_SECRET,
//       signOptions: { expiresIn: process.env.JWT_EXPIRATION },
//     }),
//   ],
//   controllers: [AuthController],
//   providers: [
//     AuthService,
//     BcryptjsHashProvider,
//     AuthRepository,
//     JwtStrategy,
//     JwtService,
//   ],
//   exports: [AuthService],
// })
// export class AuthMVCModule {}
