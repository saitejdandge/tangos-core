"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpException = void 0;
class HttpException extends Error {
    constructor(errorModel) {
        super(errorModel.title);
        this.errorModel = errorModel;
    }
}
exports.HttpException = HttpException;
