import * as express from 'express';
import { HttpException } from '../exceptions/HttpException';
export declare function errorHandlerMiddleware(error: HttpException, request: express.Request, response: express.Response, next: express.NextFunction): void;
