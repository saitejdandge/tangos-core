"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBConnectionException = void 0;
const ErrorModelBuilder_1 = require("../models/ErrorModelBuilder");
const HttpException_1 = require("./HttpException");
class DBConnectionException extends HttpException_1.HttpException {
    constructor() {
        super(new ErrorModelBuilder_1.default()
            .title('DB not connected')
            .opStatus(404)
            .build());
    }
}
exports.DBConnectionException = DBConnectionException;
