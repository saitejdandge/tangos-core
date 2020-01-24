import * as express from 'express';
import { TimeoutException } from '../exceptions/TimeoutException';

export function timeoutMiddleware(
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) {
  if (request.timedout) {
    throw new TimeoutException();
  } else {
    next();
  }
}
