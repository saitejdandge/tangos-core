"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomRoute {
    constructor(endPoint, handler, ...middlewares) {
        this.endPoint = endPoint;
        this.handler = handler;
        this.middlewares = middlewares;
    }
}
exports.CustomRoute = CustomRoute;
