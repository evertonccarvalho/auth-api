import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundError extends HttpException {
  constructor() {
    super('User not be found.', HttpStatus.NOT_FOUND);
  }
}
