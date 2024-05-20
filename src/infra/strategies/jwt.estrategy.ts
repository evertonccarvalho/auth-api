// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { UserEntity } from '@/infra/entities/user.entity';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { BadJWTError } from '../exceptions';
// import { AuthService } from '../services/auth/auth.service';
// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(private readonly authService: AuthService) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false,
//       secretOrKey: process.env.JWT_SECRET,
//     });
//   }

//   async validate(jwtPayload: JwtPayload): Promise<UserEntity> {
//     const user = await this.authService.verifyJwt(jwtPayload);
//     if (!user) {
//       throw new BadJWTError();
//     }
//     return user;
//   }
// }
