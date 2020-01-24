import * as express from 'express';
import { BaseController } from './controllers/BaseController';
import { AuthConfig } from './auth/AuthConfig';
import { DbConfig } from './database/db.config';
import { Config } from './Config';
import { BasePresenter } from './presenters/BasePresenter';
export declare class BaseApp {
    private static app;
    private readonly config;
    static getInstance(): BaseApp;
    getAuthConfig(): AuthConfig;
    getConfig(): Config;
    getDbConfig(): DbConfig;
    app: express.Application;
    private readonly dbConfig;
    private readonly authConfig;
    private initializeTimeoutMiddleware;
    constructor(config: Config, authConfig: AuthConfig, dbConfig: DbConfig, controllers: BaseController<BasePresenter>[]);
    private initializeAuthMiddleware;
    listen(): void;
    private initializeDBConnectionCheckMiddleware;
    private initializePageNotFoundMiddleware;
    private initializeLoggerMiddleware;
    private initializeErrorMiddleware;
    private initializeControllers;
    private connectToTheDatabase;
    private initializeBaseControllers;
}
