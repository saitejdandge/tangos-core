"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidParamsException = void 0;
const ErrorModelBuilder_1 = require("../models/ErrorModelBuilder");
const HttpException_1 = require("./HttpException");
class InvalidParamsException extends HttpException_1.HttpException {
    constructor() {
        super(new ErrorModelBuilder_1.ErrorModelBuilder()
            .title('Invalid Parameters')
            .opStatus(100)
            .build());
    }
}
exports.InvalidParamsException = InvalidParamsException;
