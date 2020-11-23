import ErrorModelBuilder from '../models/ErrorModelBuilder';
import { HttpException } from './HttpException';

export class PageNotFoundException extends HttpException {
  constructor() {
    super(new ErrorModelBuilder()
      .title('Page not found')
      .opStatus(404)
      .build());
  }
}
