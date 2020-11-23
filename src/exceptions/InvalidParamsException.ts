import {ErrorModelBuilder} from '../models/ErrorModelBuilder';
import { HttpException } from './HttpException';

export class InvalidParamsException extends HttpException {
  constructor() {
    super(new ErrorModelBuilder()
      .title('Invalid Parameters')
      .opStatus(100)
      .build());
  }
}
