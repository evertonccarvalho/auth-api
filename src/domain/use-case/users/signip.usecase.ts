import { DefaultUseCase } from '@/domain/protocols/use-case';
import { SigninDto, SignupDto } from '@/infra/http/auth/dto';
import { HashProvider } from '@/domain/protocols/hash-provider';
import { UserEntity } from '@/infra/entities/user.entity';
import { BadRequestError } from '@/domain/errors/bad-request-error';
import { UserRepository } from '@/domain/repositories/user.repository';
import { Injectable } from '@nestjs/common';
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error';

export namespace SignInUseCase {
  export type Input = {
    name: string;
    email: string;
    password: string;
  };

  export type Output = SigninDto;

  @Injectable()
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private userRepository: UserRepository,
      private hashProvider: HashProvider,
    ) {}

    async execute(input: Input): Promise<Output> {
      const { email, password } = input;

      if (!email || !password) {
        throw new BadRequestError('Input data not provided');
      }

      const entity = await this.userRepository.findByEmail(email);

      const hashPasswordMatches = await this.hashProvider.compareHash(
        password,
        entity.password,
      );

      if (!hashPasswordMatches) {
        throw new InvalidCredentialsError('Invalid credentials');
      }

      return entity.toJSON();
    }
  }
}
