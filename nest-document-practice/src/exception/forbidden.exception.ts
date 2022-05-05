import { HttpException, HttpStatus } from '@nestjs/common';

/** Custom exceptions */
export class ForbiddenException extends HttpException {
  constructor() {
    super(
      { status: HttpStatus.FORBIDDEN, error: 'This is a custom Message' },
      HttpStatus.FORBIDDEN,
    );
  }
}
