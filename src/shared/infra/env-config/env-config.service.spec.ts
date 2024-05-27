import { Test, TestingModule } from '@nestjs/testing';
import { EnvConfigService } from './env-config.service';
import { EnvConfigModule } from './env-config.module';

describe('EnvConfigService unit tests', () => {
  let sut: EnvConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EnvConfigModule.forRoot()],
      providers: [EnvConfigService],
    }).compile();

    sut = module.get<EnvConfigService>(EnvConfigService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should return the variable APP_NAME', () => {
    expect(sut.getAppName()).toBe('nestjs-api');
  });

  it('should return the variable PORT', () => {
    expect(sut.getAppPort()).toBe(3000);
  });

  it('should return the variable NODE_ENV', () => {
    expect(sut.getNodeEnv()).toBe('test');
  });

  it('should return the variable DB_HOST', () => {
    expect(sut.getDbHost()).toBe('localhost');
  });

  it('should return the variable DB_PORT', () => {
    expect(sut.getDbPort()).toBe(5432);
  });

  it('should return the variable DB_USER', () => {
    expect(sut.getDbUsername()).toBe('DB-USERNAME');
  });

  it('should return the variable DB_PASSWORD', () => {
    expect(sut.getDbPassword()).toBe('DB-PASSWORD');
  });

  it('should return the variable DB_DATABASE_NAME', () => {
    expect(sut.getDbDatabaseName()).toBe('DB-NAME');
  });

  it('should return the variable REDIS_HOST', () => {
    expect(sut.getRedisHost()).toBe('localhost');
  });

  it('should return the variable REDIS_PORT', () => {
    expect(sut.getRedisPort()).toBe(6379);
  });

  it('should return the variable CACHE_TTL', () => {
    expect(sut.getCacheTTL()).toBe(5);
  });

  it('should return the variable JWT_SECRET', () => {
    expect(sut.getJwtSecret()).toBe('YOUR_JWT_SECRET_CODE');
  });

  it('should return the variable JWT_EXPIRATION', () => {
    expect(sut.getJwtExpiresInSeconds()).toBe(86400);
  });
});
