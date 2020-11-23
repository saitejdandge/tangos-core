import * as express from 'express';
import { HttpException } from '../exceptions/HttpException';

// dont remove last argument
export function errorHandlerMiddleware(
  error: HttpException,
  request: express.Request,
  response: express.Response,
  next: express.NextFunction,
) {
  const opStatus = (error.errorModel != null ? error.errorModel.opStatus : 500);
  const message = error.message || 'Something went wrong';
  const result = 0;
  response.json({
    opStatus,
    message,
    result,
  });
}
