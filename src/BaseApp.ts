import * as bodyParser from 'body-parser';
import * as express from 'express';

import * as timeout from 'connect-timeout';
import { AuthConfig } from './auth/AuthConfig';
import { Config } from './Config';
import { BaseController } from './controllers/BaseController';
import { UserController } from './controllers/UserController';
import { DbConfig } from './database/db.config';
import { DBConnector } from './database/DBConnector';
import { authMiddlware } from './middlewares/authMiddleware';
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
  private readonly config: Config;
  private readonly dbConfig: DbConfig;
  private readonly authConfig: AuthConfig;

  constructor(
    config: Config,
    authConfig: AuthConfig,
    dbConfig: DbConfig,
    // tslint:disable-next-line: array-type
    controllers: BaseController<BasePresenter>[],
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

  public getAuthConfig() {
    return this.authConfig;
  }

  public getConfig() {
    return this.config;
  }

  public getDbConfig() {
    return this.dbConfig;
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`App listening on the port ${process.env.PORT}`);
    });
  }

  private initializeTimeoutMiddleware() {
    this.app.use(timeout('5s'));
    this.app.use(bodyParser.json());
    this.app.use(timeoutMiddleware);
  }

  private initializeAuthMiddleware() {
    if (this.config.isOAuthEnabled) this.app.use(authMiddlware);
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
        extended: false,
      }),
    );
  }

  private initializeErrorMiddleware() {
    this.app.use(errorHandlerMiddleware);
  }

  // tslint:disable-next-line: array-type
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
      new UserController('/' + Config.collectionNames.users).router,
    );
  }
}
