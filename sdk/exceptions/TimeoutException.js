"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeoutException = void 0;
const ErrorModelBuilder_1 = require("../models/ErrorModelBuilder");
const HttpException_1 = require("./HttpException");
class TimeoutException extends HttpException_1.HttpException {
    constructor() {
        super(new ErrorModelBuilder_1.ErrorModelBuilder().title('Request timed out').opStatus(401).build());
    }
}
exports.TimeoutException = TimeoutException;
