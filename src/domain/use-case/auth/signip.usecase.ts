import { DefaultUseCase } from '@/domain/contracts/use-case.contract';
import { HashProvider } from '@/domain/contracts/hash-provider.contract';
import { BadRequestError } from '@/domain/errors/bad-request-error';
import { IUserRepository } from '@/domain/repositories/user.repository';
import { Injectable } from '@nestjs/common';
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error';
import { UserOutput } from '@/infra/http/users/dto/user-output';

export namespace SignInUseCase {
  export type Input = {
    email: string;
    password: string;
  };

  export type Output = UserOutput;

  @Injectable()
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private userRepository: IUserRepository,
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

      return entity;
    }
  }
}
