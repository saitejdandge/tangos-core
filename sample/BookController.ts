
import * as express from 'express';
import { BaseController } from '../src/controllers/BaseController';
import { CustomRoute } from '../src/models/CustomRoute';
import Book from './book.model';
import BookPresenter from './BookPresenter';

export class BookController extends BaseController<BookPresenter> {

  constructor(endPoint: string) {
    super(endPoint, false);
    this.openCreateRoute();
  }

  public attachPresenter(): BookPresenter {
    return new BookPresenter(new Book());
  }

  public attachCustomRoutes(): CustomRoute[] {
    const routes = [new CustomRoute('test', this.test.bind(this))];
    return routes;
  }

  public test(webReq: express.Request, webRes: express.Response, next: express.NextFunction) {
    this.getPresenter().test();
    webRes.json({ reached: 1 });
  }

}
