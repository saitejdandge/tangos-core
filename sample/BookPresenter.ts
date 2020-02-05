
import { BaseModel } from '../src/models/base.model';
import { BasePresenter } from '../src/presenters/BasePresenter';
import { BaseResponse } from '../src/responses/BaseResponse';

class BookPresenter extends BasePresenter {

  constructor(baseModel: BaseModel) {
    super(baseModel);

  }

  public test(): Promise<BaseResponse> {

    return new Promise<BaseResponse>((resolve => {
      resolve(BaseResponse.getSuccessResponse(null, ''));
    }));
  }

}

export default BookPresenter;
