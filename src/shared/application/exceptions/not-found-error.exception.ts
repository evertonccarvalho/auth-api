import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundErrorException extends HttpException {
  constructor(public message: string) {
    super(message, HttpStatus.NOT_FOUND);
    this.name = 'NotFoundError';
  }
}
