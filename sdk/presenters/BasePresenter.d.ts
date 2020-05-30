import { BaseModel } from '../models/base.model';
import { BaseResponse } from '../responses/BaseResponse';
export declare class BasePresenter {
    baseModel: BaseModel;
    protected constructor(baseModel: BaseModel);
    find(query: string, project?: any, sort?: any, skip?: any, limit?: any): Promise<BaseResponse>;
    findOne(query: string): Promise<BaseResponse>;
    update(query: string, data: string): Promise<BaseResponse>;
    create(data: string): Promise<BaseResponse>;
    deleteData(query: string): Promise<BaseResponse>;
}
