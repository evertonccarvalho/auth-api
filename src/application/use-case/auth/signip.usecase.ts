import { DefaultUseCase } from '@/application/contracts/use-case.contract';
import { HashProvider } from '@/application/contracts/hash-provider.contract';
import { BadRequestError } from '@/presentation/errors/bad-request-error';
import { IUserRepository } from '@/application/repositories/user.repository';
import { Injectable } from '@nestjs/common';
import { InvalidCredentialsError } from '@/presentation/errors/invalid-credentials-error';
import { UserOutput } from '@/domain/dtos/users/user-output';

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
