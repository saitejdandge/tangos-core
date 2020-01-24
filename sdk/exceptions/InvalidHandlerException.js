"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("./HttpException");
class InvalidHandlerException extends HttpException_1.HttpException {
    constructor() {
        super(0, 100, 'Invalid Handler');
    }
}
exports.InvalidHandlerException = InvalidHandlerException;
