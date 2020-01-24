import { HttpException } from './HttpException';

export class DBConnectionException extends HttpException {
  constructor() {
    super(0, 404, 'DB not connected');
  }
}
