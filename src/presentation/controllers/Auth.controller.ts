import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { SigninDto, SignupDto } from '../../domain/dtos/auth';
import { SignInUseCase } from '@/application/use-case/auth/sign-In.usecase';
import { SignUpUseCase } from '@/application/use-case/auth/sign-up.usecase';
import { SkipAuth } from '@/core/decorators/auth.decorator';
import { UserPresenter } from '@/presentation/presenters/user.presenter';
import { AuthUseCasesProxyModule } from '../usecases-proxy/auth-usecases-proxy.module';
import { UseCaseProxy } from '../usecases-proxy/usecases-proxy';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AuthUseCasesProxyModule.SIGNIN_USECASE_PROXY)
    private readonly signinUseCase: UseCaseProxy<SignInUseCase.UseCase>,
    @Inject(AuthUseCasesProxyModule.SIGNUP_USECASE_PROXY)
    private readonly signupUseCase: UseCaseProxy<SignUpUseCase.UseCase>,
  ) {}

  @SkipAuth()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Sign in to get JWT token' })
  @ApiResponse({ status: 200, description: 'JWT token generated' })
  async signIn(@Body() signInDto: SigninDto) {
    return this.signinUseCase.getInstance().execute(signInDto);
  }

  @SkipAuth()
  @Post('signup')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created' })
  @ApiResponse({ status: 409, description: 'Email conflict' })
  async create(@Body() signupDto: SignupDto) {
    const response = await this.signupUseCase.getInstance().execute(signupDto);
    return new UserPresenter(response);
  }
}
