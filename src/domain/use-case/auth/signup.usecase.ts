import { DefaultUseCase } from '@/domain/protocols/use-case';
import { SignupDto } from '@/infra/http/auth/dto';
import { HashProvider } from '@/domain/protocols/hash-provider';
import { UserEntity } from '@/infra/entities/user.entity';
import { BadRequestError } from '@/domain/errors/bad-request-error';
import { UserRepository } from '@/domain/repositories/user.repository';
import { Injectable } from '@nestjs/common';
import { UserOutput } from '@/infra/http/users/dto/user-output';
import { UserOutputMapper } from '@/infra/http/users/mappers/user-output.mapper';

export namespace SignupUseCase {
  export type Input = {
    name: string;
    email: string;
    password: string;
  };

  export type Output = UserOutput;

  @Injectable()
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private userRepository: UserRepository,
      private hashProvider: HashProvider,
    ) {}

    async execute(input: Input): Promise<Output> {
      const { email, name, password } = input;
      if (!email || !name || !password) {
        throw new BadRequestError('Input data not provided');
      }

      await this.userRepository.emailExists(email);

      const hashPassword = await this.hashProvider.generateHash(password);

      const entity = new UserEntity(
        Object.assign(input, { password: hashPassword }),
      );

      await this.userRepository.insert(entity);
      return UserOutputMapper.toOutput(entity);
    }
  }
}
