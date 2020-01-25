import * as express from 'express';
import { AuthConfig } from './auth/AuthConfig';
import { Config } from './Config';
import { BaseController } from './controllers/BaseController';
import { DbConfig } from './database/db.config';
import { BasePresenter } from './presenters/BasePresenter';
export declare class BaseApp {
    static getInstance(): BaseApp;
    private static app;
    app: express.Application;
    private readonly config;
    private readonly dbConfig;
    private readonly authConfig;
    constructor(config: Config, authConfig: AuthConfig, dbConfig: DbConfig, controllers: BaseController<BasePresenter>[]);
    getAuthConfig(): AuthConfig;
    getConfig(): Config;
    getDbConfig(): DbConfig;
    listen(): void;
    private initializeTimeoutMiddleware;
    private initializeAuthMiddleware;
    private initializeDBConnectionCheckMiddleware;
    private initializePageNotFoundMiddleware;
    private initializeLoggerMiddleware;
    private initializeErrorMiddleware;
    private initializeControllers;
    private connectToTheDatabase;
    private initializeBaseControllers;
}
