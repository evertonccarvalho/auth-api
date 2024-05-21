import { DefaultUseCase } from '@/application/contracts/use-case.contract';
import { IBcryptService } from '@/application/contracts/hash-provider.contract';
import { BadRequestError } from '@/presentation/errors/bad-request-error';
import { Injectable } from '@nestjs/common';
import { InvalidCredentialsError } from '@/presentation/errors/invalid-credentials-error';
import { IAuthRepository } from '@/application/repositories/auth.repository';
import { UserOutput } from '@/domain/dtos/users';

export namespace SignInUseCase {
  export type Input = {
    email: string;
    password: string;
  };

  export type Output = UserOutput;

  @Injectable()
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private authRepository: IAuthRepository,
      private hashProvider: IBcryptService,
    ) {}

    async execute(input: Input): Promise<Output> {
      const { email, password } = input;

      if (!email || !password) {
        throw new BadRequestError('Input data not provided');
      }

      const entity = await this.authRepository.findByEmail(email);

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
