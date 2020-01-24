import { HttpException } from './HttpException';

export class StandardException extends HttpException {
  constructor() {
    super(0, 300, 'Something went wrong');
  }
}
