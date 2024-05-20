import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticatedUser } from '@/domain/protocols';
import { AuthService } from '../../services/auth.service';
import { SkipAuth } from '@/infra/decorators/auth.decorator';
import { SigninDto, SignupDto } from '@/infra/http/auth/dto';
import { SignupUseCase } from '@/domain/use-case/users/signup.usecase';
import { SignInUseCase } from '@/domain/use-case/users/signip.usecase';
import { JwtServiceModule } from './jwt.module';
import { JwtTokenService } from './jwt.service';

@ApiTags('Auth')
@Controller('auth')
export class JwtController {
  constructor(
    private readonly authService: JwtTokenService,
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
}
