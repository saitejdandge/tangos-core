
import {BaseModel} from "../src/models/base.model";
import {BaseResponse} from "../src/responses/BaseResponse";
import {BasePresenter} from "../src/presenters/BasePresenter";


class BookPresenter extends BasePresenter {

    constructor(baseModel: BaseModel) {
        super(baseModel);

    }

    public test(): Promise<BaseResponse> {

        return new Promise<BaseResponse>((resolve => {
            resolve(BaseResponse.getSuccessResponse(null));
        }));
    }


}

export default BookPresenter;
