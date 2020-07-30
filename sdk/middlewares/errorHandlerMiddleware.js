"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = void 0;
// dont remove last argument
function errorHandlerMiddleware(error, request, response, next) {
    const opStatus = error.opStatus || 500;
    const message = error.message || 'Something went wrong';
    const result = error.result || 0;
    response.json({
        opStatus,
        message,
        result,
    });
}
exports.errorHandlerMiddleware = errorHandlerMiddleware;
