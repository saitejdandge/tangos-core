import * as express from 'express';
import { JWTManager } from './auth/JWTManager';
import { AuthConfig } from './auth/AuthConfig';
import { BaseController } from './controllers/BaseController';
import { DbConfig } from './database/db.config';
import { BasePresenter } from './presenters/BasePresenter';
export declare class BaseApp {
    static getInstance(): BaseApp;
    private static app;
    app: express.Application;
    jwtManager: JWTManager;
    private readonly dbConfig;
    private readonly authConfig;
    constructor(authConfig: AuthConfig, dbConfig: DbConfig, controllers: BaseController<BasePresenter>[]);
    getAuthConfig(): AuthConfig;
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
