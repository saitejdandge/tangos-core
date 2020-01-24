import * as express from 'express';

export function loggerMiddleware(
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) {
  console.log(`${request.method} ${request.path}`);
  next();
}
