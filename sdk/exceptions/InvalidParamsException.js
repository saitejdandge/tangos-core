"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidParamsException = void 0;
const HttpException_1 = require("./HttpException");
class InvalidParamsException extends HttpException_1.HttpException {
    constructor() {
        super(0, 100, 'Invalid Parameters');
    }
}
exports.InvalidParamsException = InvalidParamsException;
