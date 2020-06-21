import { BaseModel } from '../models/base.model';
import { BaseResponse } from '../responses/BaseResponse';
export declare class BasePresenter {
    baseModel: BaseModel;
    protected constructor(baseModel: BaseModel);
    find(query: string, project?: string, sort?: string | undefined, skip?: number | undefined, limit?: number | undefined): Promise<BaseResponse>;
    findOne(query: string, project?: string): Promise<BaseResponse>;
    update(query: string, data: string): Promise<BaseResponse>;
    findOneAndUpdate(query: string, data: string, upsert?: boolean, newDoc?: boolean): Promise<BaseResponse>;
    create(data: string): Promise<BaseResponse>;
    deleteData(query: string): Promise<BaseResponse>;
}
