import * as bodyParser from 'body-parser';
import * as express from 'express';

import * as timeout from 'connect-timeout';
import { BaseController } from './controllers/BaseController';
import { DBConnector } from './database/DBConnector';
import { UserController } from './controllers/UserController';
import { AuthConfig } from './auth/AuthConfig';
import { DbConfig } from './database/db.config';
import { Config } from './Config';
import { BasePresenter } from './presenters/BasePresenter';
import { timeoutMiddleware } from './middlewares/timeoutMiddleware';
import { authMiddlware } from './middlewares/authMiddleware';
import { pageNotFoundMiddleware } from './middlewares/pageNotFoundMiddleware';
import { checkForDBConnectionHandler } from './middlewares/checkForDBConnectionMiddleware';
import { loggerMiddleware } from './middlewares/loggerMiddleware';
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware';

export class BaseApp {
  private static app: BaseApp;
  private readonly config: Config;

  public static getInstance() {
    return this.app;
  }

  public getAuthConfig() {
    return this.authConfig;
  }

  public getConfig() {
    return this.config;
  }

  public getDbConfig() {
    return this.dbConfig;
  }

  public app: express.Application;
  private readonly dbConfig: DbConfig;
  private readonly authConfig: AuthConfig;

  private initializeTimeoutMiddleware() {
    this.app.use(timeout('5s'));
    this.app.use(bodyParser.json());
    this.app.use(timeoutMiddleware);
  }

  constructor(
    config: Config,
    authConfig: AuthConfig,
    dbConfig: DbConfig,
    controllers: BaseController<BasePresenter>[]
  ) {
    this.config = config;
    this.app = express();
    this.dbConfig = dbConfig;
    this.authConfig = authConfig;
    this.connectToTheDatabase();
    this.initializeLoggerMiddleware();
    this.initializeTimeoutMiddleware();
    this.initializeDBConnectionCheckMiddleware();
    this.initializeAuthMiddleware();
    this.initializeBaseControllers();
    this.initializeControllers(controllers);
    this.initializePageNotFoundMiddleware();
    this.initializeErrorMiddleware();
    BaseApp.app = this;
  }

  private initializeAuthMiddleware() {
    if (this.config.isOAuthEnabled) this.app.use(authMiddlware);
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`App listening on the port ${process.env.PORT}`);
    });
  }

  private initializeDBConnectionCheckMiddleware() {
    this.app.use(checkForDBConnectionHandler);
  }

  private initializePageNotFoundMiddleware() {
    this.app.use(pageNotFoundMiddleware);
  }

  private initializeLoggerMiddleware() {
    this.app.use(loggerMiddleware);
    this.app.use(bodyParser.json());
    this.app.use(
      bodyParser.urlencoded({
        extended: false
      })
    );
  }

  private initializeErrorMiddleware() {
    this.app.use(errorHandlerMiddleware);
  }

  private initializeControllers(controllers: BaseController<BasePresenter>[]) {
    controllers.forEach(controller => {
      this.app.use('/', controller.router);
    });
  }

  private async connectToTheDatabase() {
    try {
      await new DBConnector(this.dbConfig).connect();
    } catch (e) {
      console.log('Error connecting the database');
    }
  }

  private initializeBaseControllers() {
    this.app.use(
      '/',
      new UserController('/' + Config.collectionNames.users).router
    );
  }
}
