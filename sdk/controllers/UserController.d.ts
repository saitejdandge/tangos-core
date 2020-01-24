import { BaseController } from './BaseController';
import { CustomRoute } from '../models/CustomRoute';
import { UserPresenter } from '../presenters/UserPresenter';
export declare class UserController extends BaseController<UserPresenter> {
    constructor(props: string);
    attachCustomRoutes(): CustomRoute[];
    attachPresenter(): UserPresenter;
}
