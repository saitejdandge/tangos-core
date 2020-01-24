import { HttpException } from './HttpException';

export class InvalidHandlerException extends HttpException {
  constructor() {
    super(0, 100, 'Invalid Handler');
  }
}
