"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const baseDTO_1 = require("../dto/baseDTO");
const dataDTO_1 = require("../dto/dataDTO");
const InvalidHandlerException_1 = require("../exceptions/InvalidHandlerException");
const validationMiddleware_1 = require("../middlewares/validationMiddleware");
const CommonEndPoints_1 = require("../utils/CommonEndPoints");
class BaseController {
    constructor(endPoint) {
        this.router = express.Router();
        this.endPoint = endPoint;
        this.initializeRoutes();
    }
    static attachBaseMiddlewares(middlewares) {
        const baseMiddlewares = [validationMiddleware_1.validationMiddleware(baseDTO_1.BaseDTO, true)];
        // tslint:disable-next-line: no-parameter-reassignment
        if (middlewares == null)
            middlewares = baseMiddlewares;
        // tslint:disable-next-line: no-parameter-reassignment
        else
            middlewares = middlewares.concat(baseMiddlewares);
        return middlewares;
    }
    getPresenter() {
        return this.basePresenter;
    }
    // mapping router with functions
    initializeRoutes() {
        this.basePresenter = this.attachPresenter();
        this.addRoute(CommonEndPoints_1.CommonEndPoints.CREATE, this.create.bind(this), BaseController.attachBaseMiddlewares([validationMiddleware_1.validationMiddleware(dataDTO_1.DataDTO)]));
        this.addRoute(CommonEndPoints_1.CommonEndPoints.FIND, this.find.bind(this), BaseController.attachBaseMiddlewares([]));
        this.addRoute(CommonEndPoints_1.CommonEndPoints.FIND_ONE, this.findOne.bind(this), BaseController.attachBaseMiddlewares([]));
        this.addRoute(CommonEndPoints_1.CommonEndPoints.UPDATE, this.update.bind(this), BaseController.attachBaseMiddlewares([validationMiddleware_1.validationMiddleware(dataDTO_1.DataDTO)]));
        this.addRoute(CommonEndPoints_1.CommonEndPoints.DELETE_DATA, this.deleteData.bind(this), BaseController.attachBaseMiddlewares([]));
        if (this.attachCustomRoutes() != null) {
            // tslint:disable-next-line: prefer-for-of
            for (let i = 0; i < this.attachCustomRoutes().length; i = i + 1) {
                const customRoute = this.attachCustomRoutes()[i];
                this.addRoute(customRoute.endPoint, customRoute.handler, customRoute.middlewares);
            }
        }
    }
    addRoute(endPoint, handler, ...middlewares) {
        if (handler != null) {
            console.log('Loaded Route ' + this.endPoint + '/' + endPoint);
            this.router.post(this.endPoint + '/' + endPoint, middlewares, handler);
        }
        else
            throw new InvalidHandlerException_1.InvalidHandlerException();
    }
    async create(request, response, next) {
        try {
            const res = await this.getPresenter().create(request.body.data);
            response.json(res);
        }
        catch (e) {
            next(e);
        }
    }
    async find(request, response, next) {
        try {
            const res = await this.getPresenter().find(request.body.query);
            response.json(res);
        }
        catch (e) {
            next(e);
        }
    }
    async findOne(request, response, next) {
        try {
            const res = await this.getPresenter().findOne(request.body.query);
            response.json(res);
        }
        catch (e) {
            next(e);
        }
    }
    async update(request, response, next) {
        try {
            const res = await this.getPresenter().update(request.body.query, request.body.data);
            response.json(res);
        }
        catch (e) {
            next(e);
        }
    }
    async deleteData(request, response, next) {
        try {
            const res = await this.getPresenter().deleteData(request.body.query);
            response.json(res);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.BaseController = BaseController;
