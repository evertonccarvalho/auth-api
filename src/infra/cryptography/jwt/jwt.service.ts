import {
  IJwtService,
  IJwtServicePayload,
} from '@/application/contracts/jwt.interface';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

type GenerateJwtProps = {
  accessToken: string;
};

@Injectable()
export class JwtTokenService implements IJwtService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  generateJwt(payload: IJwtServicePayload): string {
    const accesstoken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT.secret'),
    });
    return accesstoken;
  }

  async verifyJwt(token: string) {
    return this.jwtService.verifyAsync(token, {
      secret: this.configService.get('JWT.secret'),
    });
  }
}
