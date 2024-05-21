import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { SigninDto, SignupDto } from '../../domain/dtos/auth';
import { SignInUseCase } from '@/application/use-case/auth/sign-In.usecase';
import { JwtTokenService } from '@/infra/cryptography/jwt/jwt.service';
import { SignUpUseCase } from '@/application/use-case/auth/sign-up.usecase';
import { SkipAuth } from '@/core/decorators/auth.decorator';
import { UserPresenter } from '@/domain/presenters/user.presenter';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: JwtTokenService,
    private readonly signupUseCase: SignUpUseCase.UseCase,
    private readonly signinUseCase: SignInUseCase.UseCase,
  ) {}

  @SkipAuth()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Sign in to get JWT token' })
  @ApiResponse({ status: 200, description: 'JWT token generated' })
  async signIn(@Body() signInDto: SigninDto) {
    const output = await this.signinUseCase.execute(signInDto);
    return this.authService.generateJwt(output.id);
  }

  @SkipAuth()
  @Post('signup')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created' })
  @ApiResponse({ status: 409, description: 'Email conflict' })
  async create(@Body() signupDto: SignupDto) {
    const response = await this.signupUseCase.execute(signupDto);
    return new UserPresenter(response);
  }
}
