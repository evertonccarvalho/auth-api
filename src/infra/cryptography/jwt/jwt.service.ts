import { GenerateJwtProps } from '@/application/contracts/jwt.interface';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtTokenService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async generateJwt(userId: string): Promise<GenerateJwtProps> {
    const accessToken = await this.jwtService.signAsync({ id: userId }, {});
    return { accessToken };
  }

  async verifyJwt(token: string) {
    return this.jwtService.verifyAsync(token, {
      secret: this.configService.get('JWT.secret'),
    });
  }
}
