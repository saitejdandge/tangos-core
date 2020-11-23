"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidHandlerException = void 0;
const ErrorModelBuilder_1 = require("../models/ErrorModelBuilder");
const HttpException_1 = require("./HttpException");
class InvalidHandlerException extends HttpException_1.HttpException {
    constructor() {
        super(new ErrorModelBuilder_1.default()
            .title('Invalid Handler')
            .opStatus(100)
            .build());
    }
}
exports.InvalidHandlerException = InvalidHandlerException;
