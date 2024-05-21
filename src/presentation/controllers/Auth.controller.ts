import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SigninDto, SignupDto } from '../../domain/dtos/auth';
import { SignInUseCase } from '@/application/use-case/auth/signip.usecase';
import { AuthService } from '@/infra/cryptography/jwt/auth.service';
import { SignupUseCase } from '@/application/use-case/auth/signup.usecase';
import { SkipAuth } from '@/core/decorators/auth.decorator';
import { UserPresenter } from '@/domain/presenters/user.presenter';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly signupUseCase: SignupUseCase.UseCase,
    private readonly signinUseCase: SignInUseCase.UseCase,
  ) {}

  @SkipAuth()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() signInDto: SigninDto) {
    const output = await this.signinUseCase.execute(signInDto);
    return this.authService.generateJwt(output.id);
  }

  @SkipAuth()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: 409, description: 'Conflito de email' })
  async create(@Body() signupDto: SignupDto) {
    const response = await this.signupUseCase.execute(signupDto);
    return new UserPresenter(response);
  }
}
