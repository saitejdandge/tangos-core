"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TimeoutException_1 = require("../exceptions/TimeoutException");
function timeoutMiddleware(request, response, next) {
    if (request.timedout) {
        throw new TimeoutException_1.TimeoutException();
    }
    else {
        next();
    }
}
exports.timeoutMiddleware = timeoutMiddleware;
