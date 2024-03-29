import strings from '../constants/strings';
import { InvalidParamsException } from '../exceptions/InvalidParamsException';
import { StandardException } from '../exceptions/StandardException';
import { BaseModel } from '../models/base.model';
import { BaseResponse } from '../responses/BaseResponse';

export class BasePresenter {
  public baseModel: BaseModel;

  protected constructor(baseModel: BaseModel) {
    this.baseModel = baseModel;
  }

  public find(query: string, project?: string, sort?: string | undefined, skip?: number | undefined, limit?: number | undefined) {
    return new Promise<BaseResponse>(async (resolve, reject) => {
      try {
        const data = await this.baseModel
          .getModelSchema()
          .find(query != null ? JSON.parse(query) : {}, project != null ? JSON.parse(project) : {})
          .sort(sort != null ? JSON.parse(sort) : {})
          .skip(skip != null ? +skip : 0)
          .limit(limit != null ? +limit : 0);
        if (data != null && data.length !== 0) {
          resolve(JSON.parse(JSON.stringify(BaseResponse.getSuccessResponse(data, strings.success))));
        } else resolve(BaseResponse.getEmptyResponse());
      } catch (e) {
        console.log(e);
        reject(new StandardException());
      }
    });
  }

  public findOne(query: string, project?: string) {
    return new Promise<BaseResponse>(resolve => {
      this.baseModel
        .getModelSchema()
        .findOne(query != null ? JSON.parse(query) : {}, project != null ? JSON.parse(project) : {})
        .then(data => {
          if (data != null) resolve(JSON.parse(JSON.stringify(BaseResponse.getSuccessResponse(data, strings.success))));
          else resolve(BaseResponse.getEmptyResponse());
        });
    });
  }

  public update(query: string, data: string) {
    return new Promise<BaseResponse>((resolve, reject) => {
      // const id = request.params.id;
      if (data != null) {
        this.baseModel
          .getModelSchema()
          .updateMany(
            query != null ? JSON.parse(query) : {},
            { $set: data != null ? JSON.parse(data) : {} },
            { new: true },
          )
          // tslint:disable-next-line: no-shadowed-variable
          .then(data => {
            if (data != null) resolve(JSON.parse(JSON.stringify(BaseResponse.getSuccessResponse(data, strings.success))));
            else reject(new StandardException());
          });
      } else reject(new InvalidParamsException());
    });
  }

  public findOneAndUpdate(query: string, data: string, upsert?: boolean, newDoc?: boolean) {
    return new Promise<BaseResponse>((resolve, reject) => {
      // const id = request.params.id;
      if (data != null) {
        this.baseModel
          .getModelSchema()
          .findOneAndUpdate(
            query != null ? JSON.parse(query) : {},
            { $set: data != null ? JSON.parse(data) : {} },
            { upsert, new: newDoc },
          )
          // tslint:disable-next-line: no-shadowed-variable
          .then(data => {
            if (data != null) resolve(JSON.parse(JSON.stringify(BaseResponse.getSuccessResponse(data, strings.success))));
            else reject(new StandardException());
          });
      } else reject(new InvalidParamsException());
    });
  }
  public create(data: string) {
    return new Promise<BaseResponse>(async (resolve, reject) => {
      if (data != null) {
        const createdPost = new (this.baseModel.getModelSchema())(
          JSON.parse(data),
        );
        try {
          const savedPost = await createdPost.save();
          if (savedPost != null) {
            resolve(JSON.parse(JSON.stringify(BaseResponse.getSuccessResponse(savedPost, strings.success))));
          } else reject(new StandardException());
        } catch (e) {
          reject(new StandardException());
        }
      } else reject(new InvalidParamsException());
    });
  }

  public deleteData(query: string) {
    // const id = request.params.id;
    return new Promise<BaseResponse>((resolve, reject) => {
      this.baseModel
        .getModelSchema()
        .deleteMany(query != null ? JSON.parse(query) : {})
        .then(successResponse => {
          if (successResponse) {
            resolve(JSON.parse(JSON.stringify(BaseResponse.getSuccessResponse(successResponse, strings.success))));
          } else reject(new StandardException());
        });
    });
  }
}
