import * as express from 'express';
import { PageNotFoundException } from '../exceptions/PageNotFoundException';

export function pageNotFoundMiddleware(
  request: express.Request,
  response: express.Response,
  next: express.NextFunction,
) {
  // if control comes here, it means it has skipped all the controllers, hence page looking for was not found
  throw new PageNotFoundException();
}
