"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("./HttpException");
class DBConnectionException extends HttpException_1.HttpException {
    constructor() {
        super(0, 404, 'DB not connected');
    }
}
exports.DBConnectionException = DBConnectionException;
