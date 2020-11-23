import {ErrorModelBuilder} from '../models/ErrorModelBuilder';
import { HttpException } from './HttpException';

export class StandardException extends HttpException {
  constructor() {
    super(new ErrorModelBuilder().title('Something went wrong').opStatus(300).build());
  }
}
