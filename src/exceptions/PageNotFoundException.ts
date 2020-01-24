import { HttpException } from './HttpException';

export class PageNotFoundException extends HttpException {
  constructor() {
    super(0, 404, 'Page not found');
  }
}
