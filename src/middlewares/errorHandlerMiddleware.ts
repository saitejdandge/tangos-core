import * as express from 'express';
import { HttpException } from '../exceptions/HttpException';

//dont remove last argument
export function errorHandlerMiddleware(
  error: HttpException,
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) {
  const opStatus = error.opStatus || 500;
  const message = error.message || 'Something went wrong';
  const result = error.result || 0;
  response.json({
    opStatus: opStatus,
    message: message,
    result: result
  });
}
