import { HttpException } from './HttpException';

export class SessionExpiredException extends HttpException {
  constructor() {
    super(0, 401, 'Session expired');
  }
}
