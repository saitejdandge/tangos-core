import { CustomRoute } from '../models/CustomRoute';
import { UserModel } from '../models/user.model';
import { UserPresenter } from '../presenters/UserPresenter';
import { BaseController } from './BaseController';

export class UserController extends BaseController<UserPresenter> {
  public constructor(props: string) {
    super(props, true);
  }

  public attachCustomRoutes(): CustomRoute[] {
    return [];
  }

  public attachPresenter() {
    return new UserPresenter(new UserModel());
  }
}
