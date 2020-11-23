
import { ErrorModelBuilder } from '../models/ErrorModelBuilder';
import { HttpException } from './HttpException';

export class DBConnectionException extends HttpException {
  constructor() {
    super(new ErrorModelBuilder()
      .title('DB not connected')
      .opStatus(404)
      .build());
  }
}
