import * as express from 'express';
import { CustomRoute } from '../models/CustomRoute';
import { BasePresenter } from '../presenters/BasePresenter';
export declare abstract class BaseController<BP extends BasePresenter> {
    private static attachBaseMiddlewares;
    router: import("express-serve-static-core").Router;
    private readonly endPoint;
    private basePresenter;
    protected constructor(endPoint: string, openCrudEndPoints: boolean);
    abstract attachPresenter(): BP;
    abstract attachCustomRoutes(): CustomRoute[];
    getPresenter(): BP;
    openCreateRoute(...middlewares: any[]): void;
    openFindRoute(...middlewares: any[]): void;
    openFindOneRoute(...middlewares: any[]): void;
    openFindOneAndUpdateRoute(...middlewares: any[]): void;
    openUpdateRoute(...middlewares: any[]): void;
    openDeleteRoute(...middlewares: any[]): void;
    create(request: express.Request, response: express.Response, next: express.NextFunction): Promise<void>;
    find(request: express.Request, response: express.Response, next: express.NextFunction): Promise<void>;
    findOne(request: express.Request, response: express.Response, next: express.NextFunction): Promise<void>;
    update(request: express.Request, response: express.Response, next: express.NextFunction): Promise<void>;
    findOneAndUpdate(request: express.Request, response: express.Response, next: express.NextFunction): Promise<void>;
    deleteData(request: express.Request, response: express.Response, next: express.NextFunction): Promise<void>;
    private openCRUDRoutes;
    private openCustomRoutes;
    private addRoute;
}
