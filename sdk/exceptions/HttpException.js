"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpException extends Error {
    constructor(result, opStatus, message) {
        super(message);
        this.opStatus = opStatus;
        this.result = result;
        this.message = message;
    }
}
exports.HttpException = HttpException;
