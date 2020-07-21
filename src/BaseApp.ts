import * as bodyParser from 'body-parser';
import * as express from 'express';

import * as timeout from 'connect-timeout';
import { BaseController } from './controllers/BaseController';
import { DbConfig } from './database/db.config';
import { DBConnector } from './database/DBConnector';
import { checkForDBConnectionHandler } from './middlewares/checkForDBConnectionMiddleware';
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware';
import { loggerMiddleware } from './middlewares/loggerMiddleware';
import { pageNotFoundMiddleware } from './middlewares/pageNotFoundMiddleware';
import { timeoutMiddleware } from './middlewares/timeoutMiddleware';
import { BasePresenter } from './presenters/BasePresenter';

export class BaseApp {

  public static getInstance() {
    return this.app;
  }
  private static app: BaseApp;

  public app: express.Application;
  private readonly dbConfig: DbConfig;
  // tslint:disable-next-line: array-type
  private appMiddlewares: (BaseController<BasePresenter> | express.RequestHandler)[] = [];

  constructor(dbConfig: DbConfig) {
    this.app = express();
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, token',
      );
      next();
    });
    this.dbConfig = dbConfig;
    BaseApp.app = this;
  }

  public addMiddleware(middleware: BaseController<BasePresenter> | express.RequestHandler) {
    this.appMiddlewares.push(middleware);
  }
  public getDbConfig() {
    return this.dbConfig;
  }

  public listen() {
    this.connectToTheDatabase();
    this.initializeLoggerMiddleware();
    this.initializeTimeoutMiddleware();
    this.app.use(checkForDBConnectionHandler);
    this.initializeApplicationMiddlewares(this.appMiddlewares);
    this.app.use(pageNotFoundMiddleware);
    this.app.use(errorHandlerMiddleware);
    this.app.listen(process.env.PORT, () => {
      console.log(`App listening on the port ${process.env.PORT}`);
    });
  }

  private initializeTimeoutMiddleware() {
    this.app.use(timeout('10s'));
    this.app.use(timeoutMiddleware);
  }

  private initializeLoggerMiddleware() {
    this.app.use(loggerMiddleware);
    this.app.use(bodyParser.json());
    this.app.use(
      bodyParser.urlencoded({
        extended: false,
      }),
    );
  }

  // tslint:disable-next-line: array-type
  private initializeApplicationMiddlewares(controllers: (BaseController<BasePresenter> | express.RequestHandler)[]) {
    controllers.forEach(middleware => {
      if (middleware instanceof BaseController) {
        this.app.use('/', middleware.router);
      } else {
        this.app.use(middleware);
      }
    });
  }

  private async connectToTheDatabase() {
    try {
      await new DBConnector(this.dbConfig).connect();
    } catch (e) {
      console.log('Error connecting the database');
    }
  }
}
