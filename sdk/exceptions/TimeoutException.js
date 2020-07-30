"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeoutException = void 0;
const HttpException_1 = require("./HttpException");
class TimeoutException extends HttpException_1.HttpException {
    constructor() {
        super(0, 302, 'Request timed out');
    }
}
exports.TimeoutException = TimeoutException;
