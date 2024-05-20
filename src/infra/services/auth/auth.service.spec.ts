import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockResolvedValue('mocked-access-token'),
            verifyAsync: jest.fn().mockResolvedValue({ id: 'mocked-user-id' }),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('mocked-jwt-secret'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generateJwt', () => {
    it('should generate JWT token', async () => {
      const userId = 'user-id';
      const result = await service.generateJwt(userId);
      expect(result.accessToken).toEqual('mocked-access-token');
      expect(jwtService.signAsync).toHaveBeenCalledWith({ id: userId }, {});
    });
  });

  describe('verifyJwt', () => {
    it('should verify JWT token', async () => {
      const token = 'mocked-token';
      const result = await service.verifyJwt(token);
      expect(result).toEqual({ id: 'mocked-user-id' });
      expect(jwtService.verifyAsync).toHaveBeenCalledWith(token, {
        secret: 'mocked-jwt-secret',
      });
    });
  });
});
