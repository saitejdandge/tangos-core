import ErrorModel from "../models/ErrorModel";
export declare class HttpException extends Error {
    errorModel: ErrorModel;
    constructor(errorModel: ErrorModel);
}
