import {ErrorModelBuilder} from '../models/ErrorModelBuilder';
import { HttpException } from './HttpException';

export class TimeoutException extends HttpException {
  constructor() {
    super(new ErrorModelBuilder().title('Request timed out').opStatus(401).build());
  }
}
