"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strings_1 = require("../constants/strings");
const InvalidParamsException_1 = require("../exceptions/InvalidParamsException");
const StandardException_1 = require("../exceptions/StandardException");
const BaseResponse_1 = require("../responses/BaseResponse");
class BasePresenter {
    constructor(baseModel) {
        this.baseModel = baseModel;
    }
    find(query, project, sort, skip, limit) {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await this.baseModel
                    .getModelSchema()
                    .find(query != null ? JSON.parse(query) : {}, project != null ? JSON.parse(project) : {})
                    .sort(sort != null ? JSON.parse(sort) : {})
                    .skip(skip != null ? +skip : 0)
                    .limit(limit != null ? +limit : 0);
                if (data != null && data.length !== 0) {
                    resolve(JSON.parse(JSON.stringify(BaseResponse_1.BaseResponse.getSuccessResponse(data, strings_1.default.success))));
                }
                else
                    resolve(BaseResponse_1.BaseResponse.getEmptyResponse());
            }
            catch (e) {
                console.log(e);
                reject(new StandardException_1.StandardException());
            }
        });
    }
    findOne(query, project) {
        return new Promise(resolve => {
            this.baseModel
                .getModelSchema()
                .findOne(query != null ? JSON.parse(query) : {}, project != null ? JSON.parse(project) : {})
                .then(data => {
                if (data != null)
                    resolve(JSON.parse(JSON.stringify(BaseResponse_1.BaseResponse.getSuccessResponse(data, strings_1.default.success))));
                else
                    resolve(BaseResponse_1.BaseResponse.getEmptyResponse());
            });
        });
    }
    update(query, data) {
        return new Promise((resolve, reject) => {
            // const id = request.params.id;
            if (data != null) {
                this.baseModel
                    .getModelSchema()
                    .updateMany(query != null ? JSON.parse(query) : {}, { $set: data != null ? JSON.parse(data) : {} }, { new: true })
                    // tslint:disable-next-line: no-shadowed-variable
                    .then(data => {
                    if (data != null)
                        resolve(JSON.parse(JSON.stringify(BaseResponse_1.BaseResponse.getSuccessResponse(data, strings_1.default.success))));
                    else
                        reject(new StandardException_1.StandardException());
                });
            }
            else
                reject(new InvalidParamsException_1.InvalidParamsException());
        });
    }
    findOneAndUpdate(query, data, upsert, newDoc) {
        return new Promise((resolve, reject) => {
            // const id = request.params.id;
            if (data != null) {
                this.baseModel
                    .getModelSchema()
                    .findOneAndUpdate(query != null ? JSON.parse(query) : {}, { $set: data != null ? JSON.parse(data) : {} }, { upsert, new: newDoc })
                    // tslint:disable-next-line: no-shadowed-variable
                    .then(data => {
                    if (data != null)
                        resolve(JSON.parse(JSON.stringify(BaseResponse_1.BaseResponse.getSuccessResponse(data, strings_1.default.success))));
                    else
                        reject(new StandardException_1.StandardException());
                });
            }
            else
                reject(new InvalidParamsException_1.InvalidParamsException());
        });
    }
    create(data) {
        return new Promise(async (resolve, reject) => {
            if (data != null) {
                const createdPost = new (this.baseModel.getModelSchema())(JSON.parse(data));
                try {
                    const savedPost = await createdPost.save();
                    if (savedPost != null) {
                        resolve(JSON.parse(JSON.stringify(BaseResponse_1.BaseResponse.getSuccessResponse(savedPost, strings_1.default.success))));
                    }
                    else
                        reject(new StandardException_1.StandardException());
                }
                catch (e) {
                    reject(new StandardException_1.StandardException());
                }
            }
            else
                reject(new InvalidParamsException_1.InvalidParamsException());
        });
    }
    deleteData(query) {
        // const id = request.params.id;
        return new Promise((resolve, reject) => {
            this.baseModel
                .getModelSchema()
                .deleteMany(query != null ? JSON.parse(query) : {})
                .then(successResponse => {
                if (successResponse) {
                    resolve(JSON.parse(JSON.stringify(BaseResponse_1.BaseResponse.getSuccessResponse(successResponse, strings_1.default.success))));
                }
                else
                    reject(new StandardException_1.StandardException());
            });
        });
    }
}
exports.BasePresenter = BasePresenter;
