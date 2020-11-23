import {ErrorModelBuilder} from '../models/ErrorModelBuilder';
import { HttpException } from './HttpException';

export class InvalidHandlerException extends HttpException {
  constructor() {
    super(new ErrorModelBuilder()
      .title('Invalid Handler')
      .opStatus(100)
      .build());
  }
}
