import { HttpException } from './HttpException';

export class TimeoutException extends HttpException {
  constructor() {
    super(0, 302, 'Request timed out');
  }
}
