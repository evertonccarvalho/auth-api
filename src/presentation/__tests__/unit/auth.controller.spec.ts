import { SignInUseCase, SignUpUseCase } from '@/application/use-case/auth';
import { SignupDto, SigninDto } from '@/domain/dtos/auth';
import { UserOutput } from '@/domain/dtos/users/user-output';
import { UserRoles } from '@/domain/enums/roles';
import { UserStatus } from '@/domain/enums/status';
import { AuthController } from '@/presentation/controllers/auth.controller';
import { UserPresenter } from '@/presentation/presenters/user.presenter';

describe('AuthController', () => {
  let sut: AuthController;
  let signUpUseCase: SignUpUseCase.UseCase;
  let signinUseCase: SignInUseCase.UseCase;
  let id: string;
  let props: UserOutput;

  beforeEach(async () => {
    sut = new AuthController(signinUseCase, signUpUseCase);
    id = 'df96ae94-6128-486e-840c-b6f78abb4801';
    props = {
      id,
      name: 'John Doe',
      password: 'fake_password',
      email: 'johndoe@example.com',
      roles: UserRoles.User,
      status: UserStatus.Pending,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const output: SignUpUseCase.Output = props;
      const mockSignupUseCase = {
        execute: jest.fn().mockReturnValue(Promise.resolve(output)),
      };
      const mockAuthService = {
        generateJwt: jest.fn().mockReturnValue(Promise.resolve(output)),
      };
      sut['signupUseCase'] = mockSignupUseCase as any;
      sut['authService'] = mockAuthService as any;

      const input: SignupDto = {
        name: 'Jhon Doe',
        email: 'a@a.com',
        password: '1234',
      };
      const presenter = await sut.create(input);
      expect(presenter).toBeInstanceOf(UserPresenter);
      expect(presenter).toStrictEqual(new UserPresenter(output));
      expect(mockSignupUseCase.execute).toHaveBeenCalledWith(input);
    });
  });
  it('should authenticate a user', async () => {
    const output = 'fake_token';
    const mockSigninUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    const mockAuthService = {
      generateJwt: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    sut['signinUseCase'] = mockSigninUseCase as any;
    sut['authService'] = mockAuthService as any;
    const input: SigninDto = {
      password: 'fake_password',
      email: 'john.doe@example.com',
    };
    const result = await sut.signIn(input);
    expect(result).toEqual(output);
    expect(mockSigninUseCase.execute).toHaveBeenCalledWith(input);
  });
});
