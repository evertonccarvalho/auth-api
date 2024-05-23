import { DefaultUseCase } from '@/application/contracts/use-case.contract';
import { BadRequestError } from '@/presentation/errors/bad-request-error';
import { InvalidCredentialsError } from '@/presentation/errors/invalid-credentials-error';
import { AuthRepository } from '@/application/repositories/auth.repository';
import { HashProvider } from '@/application/contracts/hasher.contract';
import { EncrypterProvider } from '@/application/contracts/encrypter.contract';

export namespace SignInUseCase {
  export type Input = {
    email: string;
    password: string;
  };

  export type Output = {
    accessToken: string;
  };

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private authRepository: AuthRepository,
      private hashProvider: HashProvider,
      private jwtTokenService: EncrypterProvider,
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

      const accessToken = this.jwtTokenService.generateJwt(entity.id);

      return accessToken;
    }
  }
}
