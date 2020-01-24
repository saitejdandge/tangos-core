import { BaseController } from './BaseController';
import { CustomRoute } from '../models/CustomRoute';
import { UserModel } from '../models/user.model';
import { UserPresenter } from '../presenters/UserPresenter';

export class UserController extends BaseController<UserPresenter> {
  public constructor(props: string) {
    super(props);
  }

  attachCustomRoutes(): CustomRoute[] {
    return [];
  }

  attachPresenter() {
    return new UserPresenter(new UserModel());
  }
}
