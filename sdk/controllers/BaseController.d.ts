import { CustomRoute } from '../models/CustomRoute';
import { BasePresenter } from '../presenters/BasePresenter';
export declare abstract class BaseController<BP extends BasePresenter> {
    private readonly endPoint;
    router: import("express-serve-static-core").Router;
    private basePresenter;
    abstract attachPresenter(): BP;
    abstract attachCustomRoutes(): CustomRoute[];
    getPresenter(): BP;
    protected constructor(endPoint: string);
    private initializeRoutes;
    private static attachBaseMiddlewares;
    private addRoute;
    private create;
    private find;
    private findOne;
    private update;
    private deleteData;
}
