export interface EnvConfig {
  getAppPort(): number;
  getNodeEnv(): string;
  getAppName(): string;
  getDbHost(): string;
  getDbPort(): number;
  getDbUsername(): string;
  getDbPassword(): string;
  getDbDatabaseName(): string;
  getRedisHost(): string;
  getRedisPort(): number;
  getCacheTTL(): number;
  getCacheMax(): number;
  getJwtSecret(): string;
  getJwtExpiresInSeconds(): number;
}
