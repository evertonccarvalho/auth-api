import { EncryperProps } from '@/shared/application/contracts/encrypter.contract';
import { EnvConfigService } from '@/main/config/env-config/env-config.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtTokenService {
  constructor(
    private jwtService: JwtService,
    private configService: EnvConfigService,
  ) {}
  async generateJwt(userId: string): Promise<EncryperProps> {
    const accessToken = await this.jwtService.signAsync({ id: userId }, {});
    return { accessToken };
  }

  async verifyJwt(token: string) {
    return this.jwtService.verifyAsync(token, {
      secret: this.configService.getJwtSecret(),
    });
  }
}
