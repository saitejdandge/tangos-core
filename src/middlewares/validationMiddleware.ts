import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import * as express from 'express';
import { HttpException } from '../exceptions/HttpException';
import ErrorModel from '../models/ErrorModel';
import ErrorModelBuilder from '../models/ErrorModelBuilder';

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
          next(new HttpException(new ErrorModelBuilder().opStatus(500).title(message).build()));
        } else {
          next();
        }
      },
    );
  };
}
export function validateFieldMiddleware<T>(
  type: any,
  field: string,
  skipMissingProperties = false,
): express.RequestHandler {
  return (req, res, next) => {
    validate(plainToClass(type, JSON.parse(req.body[field])), { skipMissingProperties }).then(
      (errors: ValidationError[]) => {
        if (errors && errors.length > 0) {
          const message = errors
            .map((error: ValidationError) => error.constraints ? Object.values(error.constraints) : '')
            .join(', ');
          next(new HttpException(new ErrorModelBuilder().title(message).opStatus(400).build()));
        } else {
          next();
        }
      },
    );
  };
}
