"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InvalidParamsException_1 = require("../exceptions/InvalidParamsException");
const StandardException_1 = require("../exceptions/StandardException");
const BaseResponse_1 = require("../responses/BaseResponse");
const strings_1 = require("../constants/strings");
class BasePresenter {
    constructor(baseModel) {
        this.find = (query) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const data = await this.baseModel
                        .getModelSchema()
                        .find(query != null ? JSON.parse(query) : {});
                    if (data != null && data.length !== 0) {
                        resolve(JSON.parse(JSON.stringify(BaseResponse_1.BaseResponse.getSuccessResponse(data, strings_1.default.success))));
                    }
                    else
                        resolve(BaseResponse_1.BaseResponse.getEmptyResponse());
                }
                catch (e) {
                    reject(new StandardException_1.StandardException());
                }
            });
        };
        this.findOne = (query) => {
            return new Promise(resolve => {
                this.baseModel
                    .getModelSchema()
                    .findOne(query != null ? JSON.parse(query) : {})
                    .then(data => {
                    if (data != null)
                        resolve(JSON.parse(JSON.stringify(BaseResponse_1.BaseResponse.getSuccessResponse(data, strings_1.default.success))));
                    else
                        resolve(BaseResponse_1.BaseResponse.getEmptyResponse());
                });
            });
        };
        this.update = (query, data) => {
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
        };
        this.create = (data) => {
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
        };
        this.deleteData = (query) => {
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
        };
        this.baseModel = baseModel;
    }
}
exports.BasePresenter = BasePresenter;
