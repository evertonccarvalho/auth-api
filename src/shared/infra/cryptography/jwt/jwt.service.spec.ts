import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { EnvConfigService } from '@/shared/infra/env-config/env-config.service';
import { EnvConfigModule } from '@/shared/infra/env-config/env-config.module';
import { JwtTokenService } from './jwt.service';

describe('AuthService unit tests', () => {
  let sut: JwtTokenService;
  let module: TestingModule;
  let jwtService: JwtService;
  let envConfigService: EnvConfigService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        EnvConfigModule,
        JwtModule.registerAsync({
          imports: [EnvConfigModule],
          inject: [EnvConfigService],
          useFactory: async (configService: EnvConfigService) => ({
            global: true,
            secret: configService.getJwtSecret(),
            signOptions: { expiresIn: configService.getJwtExpiresInSeconds() },
          }),
        }),
      ],
      providers: [JwtTokenService],
    }).compile();

    jwtService = module.get<JwtService>(JwtService);
    envConfigService = module.get<EnvConfigService>(EnvConfigService);
    sut = module.get<JwtTokenService>(JwtTokenService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should return a jwt', async () => {
    const result = await sut.generateJwt('fakeId');

    expect(Object.keys(result)).toEqual(['accessToken']);
    expect(typeof result.accessToken).toEqual('string');
  });

  it('should verify a jwt', async () => {
    const result = await sut.generateJwt('fakeId');

    const validToken = await sut.verifyJwt(result.accessToken);
    expect(validToken).not.toBeNull();

    // Verificar se uma exceção é lançada para um token inválido
    await expect(sut.verifyJwt('fake')).rejects.toThrow();
    await expect(
      sut.verifyJwt(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      ),
    ).rejects.toThrow();
  });
});
