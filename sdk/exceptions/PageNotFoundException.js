"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("./HttpException");
class PageNotFoundException extends HttpException_1.HttpException {
    constructor() {
        super(0, 404, 'Page not found');
    }
}
exports.PageNotFoundException = PageNotFoundException;
