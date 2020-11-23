"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageNotFoundException = void 0;
const ErrorModelBuilder_1 = require("../models/ErrorModelBuilder");
const HttpException_1 = require("./HttpException");
class PageNotFoundException extends HttpException_1.HttpException {
    constructor() {
        super(new ErrorModelBuilder_1.default()
            .title('Page not found')
            .opStatus(404)
            .build());
    }
}
exports.PageNotFoundException = PageNotFoundException;
