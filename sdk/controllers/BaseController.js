"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const validationMiddleware_1 = require("../middlewares/validationMiddleware");
const CommonEndPoints_1 = require("../utils/CommonEndPoints");
const dataDTO_1 = require("../dto/dataDTO");
const baseDTO_1 = require("../dto/baseDTO");
const InvalidHandlerException_1 = require("../exceptions/InvalidHandlerException");
class BaseController {
    constructor(endPoint) {
        this.router = express.Router();
        this.endPoint = endPoint;
        this.initializeRoutes();
    }
    getPresenter() {
        return this.basePresenter;
    }
    //mapping router with functions
    initializeRoutes() {
        this.basePresenter = this.attachPresenter();
        this.addRoute(CommonEndPoints_1.CommonEndPoints.CREATE, this.create.bind(this), BaseController.attachBaseMiddlewares([validationMiddleware_1.validationMiddleware(dataDTO_1.DataDTO)]));
        this.addRoute(CommonEndPoints_1.CommonEndPoints.FIND, this.find.bind(this), BaseController.attachBaseMiddlewares([]));
        this.addRoute(CommonEndPoints_1.CommonEndPoints.FIND_ONE, this.findOne.bind(this), BaseController.attachBaseMiddlewares([]));
        this.addRoute(CommonEndPoints_1.CommonEndPoints.UPDATE, this.update.bind(this), BaseController.attachBaseMiddlewares([validationMiddleware_1.validationMiddleware(dataDTO_1.DataDTO)]));
        this.addRoute(CommonEndPoints_1.CommonEndPoints.DELETE_DATA, this.deleteData.bind(this), BaseController.attachBaseMiddlewares([]));
        if (this.attachCustomRoutes() != null)
            for (let i = 0; i < this.attachCustomRoutes().length; i++) {
                let customRoute = this.attachCustomRoutes()[i];
                this.addRoute(customRoute.endPoint, customRoute.handler, customRoute.middlewares);
            }
    }
    static attachBaseMiddlewares(middlewares) {
        let baseMiddlewares = [validationMiddleware_1.validationMiddleware(baseDTO_1.BaseDTO, true)];
        if (middlewares == null)
            middlewares = baseMiddlewares;
        else
            middlewares = middlewares.concat(baseMiddlewares);
        return middlewares;
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
            let res = await this.getPresenter().create(request.body.data);
            response.json(res);
        }
        catch (e) {
            next(e);
        }
    }
    async find(request, response, next) {
        try {
            let res = await this.getPresenter().find(request.body.query);
            response.json(res);
        }
        catch (e) {
            next(e);
        }
    }
    async findOne(request, response, next) {
        try {
            let res = await this.getPresenter().findOne(request.body.query);
            response.json(res);
        }
        catch (e) {
            next(e);
        }
    }
    async update(request, response, next) {
        try {
            let res = await this.getPresenter().update(request.body.query, request.body.data);
            response.json(res);
        }
        catch (e) {
            next(e);
        }
    }
    async deleteData(request, response, next) {
        try {
            let res = await this.getPresenter().deleteData(request.body.query);
            response.json(res);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.BaseController = BaseController;
