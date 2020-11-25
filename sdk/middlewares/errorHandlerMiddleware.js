"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = void 0;
// dont remove last argument
function errorHandlerMiddleware(error, request, response, next) {
    if (error.errorModel != null) {
        const opStatus = (error.errorModel.opStatus != null ? error.errorModel.opStatus : 500);
        const message = error.errorModel.subTitle || 'Something went wrong';
        let responseValue = {
            opStatus,
            message,
            result: 0,
        };
        if (error.errorModel.subTitle)
            responseValue.subTitle = error.errorModel.subTitle;
        if (error.errorModel.image)
            responseValue.image = error.errorModel.image;
        response.json(responseValue);
    }
    else {
        response.json({ result: 0, message: 'Something went wrong', opStatus: 500 });
    }
}
exports.errorHandlerMiddleware = errorHandlerMiddleware;
