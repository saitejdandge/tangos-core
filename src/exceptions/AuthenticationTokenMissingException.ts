import { HttpException } from './HttpException';

export class AuthenticationTokenMissingException extends HttpException {
  constructor() {
    super(0, 401, 'Authentication token missing');
  }
}
