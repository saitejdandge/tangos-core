import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import * as express from 'express';
import { HttpException } from '../exceptions/HttpException';

export function validationMiddleware<T>(
  type: any,
  skipMissingProperties = false,
): express.RequestHandler {
  return (req, res, next) => {
    validate(plainToClass(type, req.body), { skipMissingProperties }).then(
      (errors: ValidationError[]) => {
        if (errors && errors.length > 0) {
          const message = errors
            .map((error: ValidationError) => error.constraints ? Object.values(error.constraints) : '')
            .join(', ');
          next(new HttpException(0, 400, message));
        } else {
          next();
        }
      },
    );
  };
}
export function validationDataMiddleware<T>(
  type: any,
  skipMissingProperties = false,
): express.RequestHandler {
  return (req, res, next) => {
    validate(plainToClass(type, req.body.data), { skipMissingProperties }).then(
      (errors: ValidationError[]) => {
        if (errors && errors.length > 0) {
          const message = errors
            .map((error: ValidationError) => error.constraints ? Object.values(error.constraints) : '')
            .join(', ');
          next(new HttpException(0, 400, message));
        } else {
          next();
        }
      },
    );
  };
}
