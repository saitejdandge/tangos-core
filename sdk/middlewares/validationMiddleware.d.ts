import * as express from 'express';
export declare function validationMiddleware<T>(type: any, skipMissingProperties?: boolean): express.RequestHandler;
export declare function validationDataMiddleware<T>(type: any, skipMissingProperties?: boolean): express.RequestHandler;
