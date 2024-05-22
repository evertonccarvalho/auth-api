export interface IJwtServicePayload {
  id: string;
}

export interface IJwtService {
  generateJwt(payload: IJwtServicePayload): string;
  verifyJwt(token: string): Promise<any>;
}
