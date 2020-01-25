"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PageNotFoundException_1 = require("../exceptions/PageNotFoundException");
function pageNotFoundMiddleware(request, response, next) {
    // if control comes here, it means it has skipped all the controllers, hence page looking for was not found
    throw new PageNotFoundException_1.PageNotFoundException();
}
exports.pageNotFoundMiddleware = pageNotFoundMiddleware;
