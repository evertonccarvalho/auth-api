export type EncryperProps = {
  accessToken: string;
};

export interface EncrypterProvider {
  generateJwt(userId: string): Promise<EncryperProps>;
  verifyJwt(token: string): Promise<any>;
}
