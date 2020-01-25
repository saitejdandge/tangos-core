import { CustomRoute } from '../models/CustomRoute';
import { BasePresenter } from '../presenters/BasePresenter';
export declare abstract class BaseController<BP extends BasePresenter> {
    private static attachBaseMiddlewares;
    router: import("express-serve-static-core").Router;
    private readonly endPoint;
    private basePresenter;
    protected constructor(endPoint: string);
    abstract attachPresenter(): BP;
    abstract attachCustomRoutes(): CustomRoute[];
    getPresenter(): BP;
    private initializeRoutes;
    private addRoute;
    private create;
    private find;
    private findOne;
    private update;
    private deleteData;
}
