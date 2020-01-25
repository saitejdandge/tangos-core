import { CustomRoute } from '../models/CustomRoute';
import { UserPresenter } from '../presenters/UserPresenter';
import { BaseController } from './BaseController';
export declare class UserController extends BaseController<UserPresenter> {
    constructor(props: string);
    attachCustomRoutes(): CustomRoute[];
    attachPresenter(): UserPresenter;
}
