import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SigninDto } from '../http/auth/dto/sign-in.dto';
import { SignupDto } from '@/infra/http/auth/dto/sign-up.dto';
import { AuthenticatedUser } from '@/domain/adapters';
import { UserEntity } from '@/infra/entities/user.entity';
import {
  EmailIsTakenError,
  PasswordDoesntMatchError,
  UserNotFoundError,
} from '@/infra/exceptions';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'jsonwebtoken';
import { BcryptjsHashProvider } from '../providers/bcrypt/bcryptjs-hash.provider';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly hashProvider: BcryptjsHashProvider,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signupDto: SignupDto): Promise<AuthenticatedUser> {
    const entity = await this.userRepository.findOne({
      where: { email: signupDto.email },
    });

    if (entity) {
      throw new EmailIsTakenError();
    }

    const hashPassword = await this.hashProvider.generateHash(
      signupDto.password,
    );

    const newUser = this.userRepository.create({
      ...signupDto,
      password: hashPassword,
    });

    const savedUser = await this.userRepository.save(newUser);

    const accessToken = await this.createAccessToken(savedUser.id);

    return {
      id: savedUser.id,
      name: savedUser.name,
      email: savedUser.email,
      accessToken,
    };
  }

  async signIn(signinDto: SigninDto): Promise<AuthenticatedUser> {
    const entity = await this.userRepository.findOne({
      where: { email: signinDto.email },
    });

    if (!entity) {
      throw new UserNotFoundError();
    }

    const hashPasswordMatches = await this.hashProvider.compareHash(
      signinDto.password,
      entity.password,
    );

    if (!hashPasswordMatches) {
      throw new PasswordDoesntMatchError();
    }

    const accessToken = await this.createAccessToken(entity.id);

    return {
      id: entity.id,
      name: entity.name,
      accessToken,
      email: entity.email,
    };
  }

  async createAccessToken(userId: string): Promise<string> {
    return this.jwtService.sign(
      { userId },
      { expiresIn: process.env.JWT_EXPIRATION, secret: process.env.JWT_SECRET },
    );
  }

  async validateUser(jwtPayload: JwtPayload): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id: jwtPayload.userId },
    });

    if (!user) {
      throw new UserNotFoundError();
    }
    return user;
  }
}
