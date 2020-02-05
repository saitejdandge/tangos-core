import * as express from 'express';
export declare function validationMiddleware<T>(type: any, skipMissingProperties?: boolean): express.RequestHandler;
export declare function validateFieldMiddleware<T>(type: any, field: string, skipMissingProperties?: boolean): express.RequestHandler;
