import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { SkipAuth } from '@/shared/application/decorators/auth.decorator';
import { SignInUseCase, SignUpUseCase } from '@/application/use-case/auth';
import { UserPresenter } from '../presenters/user.presenter';
import { SigninDto, SignupDto } from '@/presentation/dtos/auth';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private signinUseCase: SignInUseCase.UseCase,
    private signupUseCase: SignUpUseCase.UseCase,
  ) {}

  @SkipAuth()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Sign in to get JWT token' })
  @ApiResponse({ status: 200, description: 'JWT token generated' })
  async signIn(@Body() signInDto: SigninDto) {
    return this.signinUseCase.execute(signInDto);
  }

  @SkipAuth()
  @Post('signup')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created' })
  @ApiResponse({ status: 409, description: 'Email conflict' })
  async create(@Body() signupDto: SignupDto) {
    const output = await this.signupUseCase.execute(signupDto);
    return new UserPresenter(output);
  }
}
