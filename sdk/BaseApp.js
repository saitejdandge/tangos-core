"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseApp = void 0;
const bodyParser = require("body-parser");
const express = require("express");
const timeout = require("connect-timeout");
const BaseController_1 = require("./controllers/BaseController");
const DBConnector_1 = require("./database/DBConnector");
const checkForDBConnectionMiddleware_1 = require("./middlewares/checkForDBConnectionMiddleware");
const errorHandlerMiddleware_1 = require("./middlewares/errorHandlerMiddleware");
const loggerMiddleware_1 = require("./middlewares/loggerMiddleware");
const pageNotFoundMiddleware_1 = require("./middlewares/pageNotFoundMiddleware");
const timeoutMiddleware_1 = require("./middlewares/timeoutMiddleware");
class BaseApp {
    constructor(dbConfig) {
        // tslint:disable-next-line: array-type
        this.appMiddlewares = [];
        this.app = express();
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, token');
            next();
        });
        this.dbConfig = dbConfig;
        BaseApp.app = this;
    }
    static getInstance() {
        return this.app;
    }
    addMiddleware(middleware) {
        this.appMiddlewares.push(middleware);
    }
    getDbConfig() {
        return this.dbConfig;
    }
    listen() {
        this.connectToTheDatabase();
        this.initializeLoggerMiddleware();
        this.initializeTimeoutMiddleware();
        this.app.use(checkForDBConnectionMiddleware_1.checkForDBConnectionHandler);
        this.initializeApplicationMiddlewares(this.appMiddlewares);
        this.app.use(pageNotFoundMiddleware_1.pageNotFoundMiddleware);
        this.app.use(errorHandlerMiddleware_1.errorHandlerMiddleware);
        this.app.listen(process.env.PORT, () => {
            console.log(`App listening on the port ${process.env.PORT}`);
        });
    }
    initializeTimeoutMiddleware() {
        this.app.use(timeout('10s'));
        this.app.use(timeoutMiddleware_1.timeoutMiddleware);
    }
    initializeLoggerMiddleware() {
        this.app.use(loggerMiddleware_1.loggerMiddleware);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: false,
        }));
    }
    // tslint:disable-next-line: array-type
    initializeApplicationMiddlewares(controllers) {
        controllers.forEach(middleware => {
            if (middleware instanceof BaseController_1.BaseController) {
                this.app.use('/', middleware.router);
            }
            else {
                this.app.use(middleware);
            }
        });
    }
    async connectToTheDatabase() {
        try {
            await new DBConnector_1.DBConnector(this.dbConfig).connect();
        }
        catch (e) {
            console.log('Error connecting the database');
        }
    }
}
exports.BaseApp = BaseApp;
