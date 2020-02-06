import * as express from 'express';
import { BaseDTO } from '../dto/baseDTO';
import { DataDTO } from '../dto/dataDTO';
import { InvalidHandlerException } from '../exceptions/InvalidHandlerException';
import { validationMiddleware } from '../middlewares/validationMiddleware';
import { CustomRoute } from '../models/CustomRoute';
import { BasePresenter } from '../presenters/BasePresenter';
import { CommonEndPoints } from '../utils/CommonEndPoints';

export abstract class BaseController<BP extends BasePresenter> {
  private static attachBaseMiddlewares(middlewares: any[]) {
    const baseMiddlewares = [validationMiddleware(BaseDTO, true)];
    // tslint:disable-next-line: no-parameter-reassignment
    if (middlewares == null) middlewares = baseMiddlewares;
    // tslint:disable-next-line: no-parameter-reassignment
    else middlewares = middlewares.concat(baseMiddlewares);
    return middlewares;
  }
  public router = express.Router();
  private readonly endPoint: string;

  // @ts-ignore
  private basePresenter: BP;

  protected constructor(endPoint: string, openCrudEndPoints: boolean) {
    this.endPoint = endPoint;
    this.basePresenter = this.attachPresenter();
    if (openCrudEndPoints) {
      this.openCRUDRoutes();
    }
    this.openCustomRoutes();
  }

  public abstract attachPresenter(): BP;

  public abstract attachCustomRoutes(): CustomRoute[];

  public getPresenter(): BP {
    return this.basePresenter;
  }

  public openCreateRoute(...middlewares: any[]) {
    this.addRoute(
      CommonEndPoints.CREATE,
      this.create.bind(this),
      BaseController.attachBaseMiddlewares([validationMiddleware(DataDTO), middlewares]),
    );
  }
  public openFindRoute(...middlewares: any[]) {
    this.addRoute(
      CommonEndPoints.FIND,
      this.find.bind(this),
      BaseController.attachBaseMiddlewares([middlewares]),
    );
  }

  public openFindOneRoute(...middlewares: any[]) {
    this.addRoute(
      CommonEndPoints.FIND_ONE,
      this.findOne.bind(this),
      BaseController.attachBaseMiddlewares([middlewares]),
    );
  }

  public openUpdateRoute(...middlewares: any[]) {
    this.addRoute(
      CommonEndPoints.UPDATE,
      this.update.bind(this),
      BaseController.attachBaseMiddlewares([validationMiddleware(DataDTO), middlewares]),
    );
  }

  public openDeleteRoute(...middlewares: any[]) {
    this.addRoute(
      CommonEndPoints.DELETE_DATA,
      this.deleteData.bind(this),
      BaseController.attachBaseMiddlewares([middlewares]),
    );
  }
  // mapping router with functions
  private openCRUDRoutes() {
    this.openCreateRoute();
    this.openFindRoute();
    this.openFindOneRoute();
    this.openUpdateRoute();
    this.openDeleteRoute();
  }

  private openCustomRoutes() {
    if (this.attachCustomRoutes() != null) {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.attachCustomRoutes().length; i = i + 1) {
        const customRoute: CustomRoute = this.attachCustomRoutes()[i];
        this.addRoute(
          customRoute.endPoint,
          customRoute.handler,
          customRoute.middlewares,
        );
      }
    }
  }

  private addRoute(endPoint: string, handler: any, ...middlewares: any[]) {
    if (handler != null) {
      console.log('Loaded Route ' + this.endPoint + '/' + endPoint);
      this.router.post(this.endPoint + '/' + endPoint, middlewares, handler);
    } else throw new InvalidHandlerException();
  }

  private async create(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const res = await this.getPresenter().create(request.body.data);
      response.json(res);
    } catch (e) {
      next(e);
    }
  }

  private async find(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const res = await this.getPresenter().find(request.body.query, request.body.project, request.body.sort, request.body.skip, request.body.limit);
      response.json(res);
    } catch (e) {
      next(e);
    }
  }

  private async findOne(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const res = await this.getPresenter().findOne(request.body.query);
      response.json(res);
    } catch (e) {
      next(e);
    }
  }

  private async update(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const res = await this.getPresenter().update(
        request.body.query,
        request.body.data,
      );
      response.json(res);
    } catch (e) {
      next(e);
    }
  }

  private async deleteData(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const res = await this.getPresenter().deleteData(request.body.query);
      response.json(res);
    } catch (e) {
      next(e);
    }
  }
}
