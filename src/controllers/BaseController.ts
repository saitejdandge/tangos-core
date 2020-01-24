import * as express from 'express';
import { validationMiddleware } from '../middlewares/validationMiddleware';
import { CustomRoute } from '../models/CustomRoute';
import { CommonEndPoints } from '../utils/CommonEndPoints';
import { DataDTO } from '../dto/dataDTO';
import { BaseDTO } from '../dto/baseDTO';
import { InvalidHandlerException } from '../exceptions/InvalidHandlerException';
import { BasePresenter } from '../presenters/BasePresenter';

export abstract class BaseController<BP extends BasePresenter> {
  private readonly endPoint: string;
  public router = express.Router();

  // @ts-ignore
  private basePresenter: BP;

  abstract attachPresenter(): BP;

  abstract attachCustomRoutes(): CustomRoute[];

  getPresenter(): BP {
    return this.basePresenter;
  }

  protected constructor(endPoint: string) {
    this.endPoint = endPoint;
    this.initializeRoutes();
  }

  //mapping router with functions
  private initializeRoutes() {
    this.basePresenter = this.attachPresenter();
    this.addRoute(
      CommonEndPoints.CREATE,
      this.create.bind(this),
      BaseController.attachBaseMiddlewares([validationMiddleware(DataDTO)])
    );
    this.addRoute(
      CommonEndPoints.FIND,
      this.find.bind(this),
      BaseController.attachBaseMiddlewares([])
    );
    this.addRoute(
      CommonEndPoints.FIND_ONE,
      this.findOne.bind(this),
      BaseController.attachBaseMiddlewares([])
    );
    this.addRoute(
      CommonEndPoints.UPDATE,
      this.update.bind(this),
      BaseController.attachBaseMiddlewares([validationMiddleware(DataDTO)])
    );
    this.addRoute(
      CommonEndPoints.DELETE_DATA,
      this.deleteData.bind(this),
      BaseController.attachBaseMiddlewares([])
    );

    if (this.attachCustomRoutes() != null)
      for (let i = 0; i < this.attachCustomRoutes().length; i++) {
        let customRoute: CustomRoute = this.attachCustomRoutes()[i];
        this.addRoute(
          customRoute.endPoint,
          customRoute.handler,
          customRoute.middlewares
        );
      }
  }

  private static attachBaseMiddlewares(middlewares: any[]) {
    let baseMiddlewares = [validationMiddleware(BaseDTO, true)];
    if (middlewares == null) middlewares = baseMiddlewares;
    else middlewares = middlewares.concat(baseMiddlewares);
    return middlewares;
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
    next: express.NextFunction
  ) {
    try {
      let res = await this.getPresenter().create(request.body.data);
      response.json(res);
    } catch (e) {
      next(e);
    }
  }

  private async find(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) {
    try {
      let res = await this.getPresenter().find(request.body.query);
      response.json(res);
    } catch (e) {
      next(e);
    }
  }

  private async findOne(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) {
    try {
      let res = await this.getPresenter().findOne(request.body.query);
      response.json(res);
    } catch (e) {
      next(e);
    }
  }

  private async update(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) {
    try {
      let res = await this.getPresenter().update(
        request.body.query,
        request.body.data
      );
      response.json(res);
    } catch (e) {
      next(e);
    }
  }

  private async deleteData(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) {
    try {
      let res = await this.getPresenter().deleteData(request.body.query);
      response.json(res);
    } catch (e) {
      next(e);
    }
  }
}
