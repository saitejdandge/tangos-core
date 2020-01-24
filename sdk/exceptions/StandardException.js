"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("./HttpException");
class StandardException extends HttpException_1.HttpException {
    constructor() {
        super(0, 300, 'Something went wrong');
    }
}
exports.StandardException = StandardException;
