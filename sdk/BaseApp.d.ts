import * as express from 'express';
import { BaseController } from './controllers/BaseController';
import { DbConfig } from './database/db.config';
import { BasePresenter } from './presenters/BasePresenter';
export declare class BaseApp {
    static getInstance(): BaseApp;
    private static app;
    app: express.Application;
    private readonly dbConfig;
    private appMiddlewares;
    constructor(dbConfig: DbConfig);
    addMiddleware(middleware: BaseController<BasePresenter> | express.RequestHandler): void;
    getDbConfig(): DbConfig;
    listen(): void;
    private initializeTimeoutMiddleware;
    private initializeLoggerMiddleware;
    private initializeApplicationMiddlewares;
    private connectToTheDatabase;
}
