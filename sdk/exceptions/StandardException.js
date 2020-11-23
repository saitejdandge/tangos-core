"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StandardException = void 0;
const ErrorModelBuilder_1 = require("../models/ErrorModelBuilder");
const HttpException_1 = require("./HttpException");
class StandardException extends HttpException_1.HttpException {
    constructor() {
        super(new ErrorModelBuilder_1.default().title('Something went wrong').opStatus(300).build());
    }
}
exports.StandardException = StandardException;
