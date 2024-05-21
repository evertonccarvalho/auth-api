import { Test, TestingModule } from '@nestjs/testing';
import { JwtTokenService } from './jwt.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: JwtTokenService;
  let jwtServiceMock: JwtService;
  let configServiceMock: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtTokenService,
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

    service = module.get<JwtTokenService>(JwtTokenService);
    jwtServiceMock = module.get<JwtService>(JwtService);
    configServiceMock = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generateJwt', () => {
    it('should generate JWT token', async () => {
      const userId = 'user-id';
      const result = await service.generateJwt(userId);
      expect(result.accessToken).toEqual('mocked-access-token');
      expect(jwtServiceMock.signAsync).toHaveBeenCalledWith({ id: userId }, {});
    });
  });

  describe('verifyJwt', () => {
    it('should verify JWT token', async () => {
      const token = 'mocked-token';
      const result = await service.verifyJwt(token);
      expect(result).toEqual({ id: 'mocked-user-id' });
      expect(jwtServiceMock.verifyAsync).toHaveBeenCalledWith(token, {
        secret: 'mocked-jwt-secret',
      });
    });
  });
});
