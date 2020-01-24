import { BaseModel } from '../models/base.model';
import { BaseResponse } from '../responses/BaseResponse';
export declare class BasePresenter {
    baseModel: BaseModel;
    protected constructor(baseModel: BaseModel);
    find: (query: string) => Promise<unknown>;
    findOne: (query: string) => Promise<BaseResponse>;
    update: (query: string, data: string) => Promise<BaseResponse>;
    create: (data: string) => Promise<unknown>;
    deleteData: (query: string) => Promise<BaseResponse>;
}
