"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpException = void 0;
class HttpException extends Error {
    constructor(result, opStatus, message) {
        super(message);
        this.opStatus = opStatus;
        this.result = result;
        this.message = message;
    }
}
exports.HttpException = HttpException;
