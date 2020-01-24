import { HttpException } from './HttpException';

export class InvalidParamsException extends HttpException {
  constructor() {
    super(0, 100, 'Invalid Parameters');
  }
}
