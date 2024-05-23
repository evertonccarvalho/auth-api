export type GenerateJwtProps = {
  accessToken: string;
};
export interface IJwtService {
  generateJwt(userId: string): Promise<GenerateJwtProps>;
  verifyJwt(token: string): Promise<any>;
}
