import { BcryptService } from './bcrypt.service';

describe('BcryptjsHashProvider unit tests', () => {
  let sut: BcryptService;

  beforeEach(() => {
    sut = new BcryptService();
  });

  it('Should return encrypted password', async () => {
    const password = 'TestPassword123';
    const hash = await sut.generateHash(password);
    expect(hash).toBeDefined();
  });

  it('Should return false on invalid password and hash comparison', async () => {
    const password = 'TestPassword123';
    const hash = await sut.generateHash(password);
    const result = await sut.compareHash('fake', hash);
    expect(result).toBeFalsy();
  });

  it('Should return true on valid password and hash comparison', async () => {
    const password = 'TestPassword123';
    const hash = await sut.generateHash(password);
    const result = await sut.compareHash(password, hash);
    expect(result).toBeTruthy();
  });
});
