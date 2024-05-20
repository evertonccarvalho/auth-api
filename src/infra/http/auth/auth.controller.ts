import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignupDto } from '../users/dto/sign-up.dto';
import { SigninDto } from './dto/sign-in.dto';
import { AuthenticatedUser } from '@/domain/protocols';
import { AuthService } from '../../services/auth.service';
import { SkipAuth } from '@/infra/decorators/auth.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SkipAuth()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: 409, description: 'Conflito de email' })
  signUp(@Body() signUpDto: SignupDto): Promise<AuthenticatedUser> {
    return this.authService.signUp(signUpDto);
  }

  @SkipAuth()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() signInDto: SigninDto): Promise<AuthenticatedUser> {
    return this.authService.signIn(signInDto);
  }
}
