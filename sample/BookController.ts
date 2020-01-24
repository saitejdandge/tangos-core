
import Book from "./book.model";
import BookPresenter from "./BookPresenter";
import * as express from "express"
import {CustomRoute} from "../src/models/CustomRoute";
import {BaseController} from "../src/controllers/BaseController";

export class BookController extends BaseController<BookPresenter> {


    constructor(endPoint:string) {
        super(endPoint);
    }


    attachPresenter(): BookPresenter {
        return new BookPresenter(new Book());
    }

    attachCustomRoutes(): CustomRoute[] {
        let routes = [new CustomRoute("test", this.test.bind(this))];
        return routes;
    }

    test(web_req: express.Request, web_res: express.Response, next: express.NextFunction) {
        this.getPresenter().test();
        web_res.json({reached: 1});
    }

}
