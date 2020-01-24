"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const express = require("express");
const timeout = require("connect-timeout");
const DBConnector_1 = require("./database/DBConnector");
const UserController_1 = require("./controllers/UserController");
const Config_1 = require("./Config");
const timeoutMiddleware_1 = require("./middlewares/timeoutMiddleware");
const authMiddleware_1 = require("./middlewares/authMiddleware");
const pageNotFoundMiddleware_1 = require("./middlewares/pageNotFoundMiddleware");
const checkForDBConnectionMiddleware_1 = require("./middlewares/checkForDBConnectionMiddleware");
const loggerMiddleware_1 = require("./middlewares/loggerMiddleware");
const errorHandlerMiddleware_1 = require("./middlewares/errorHandlerMiddleware");
class BaseApp {
    constructor(config, authConfig, dbConfig, controllers) {
        this.config = config;
        this.app = express();
        this.dbConfig = dbConfig;
        this.authConfig = authConfig;
        this.connectToTheDatabase();
        this.initializeLoggerMiddleware();
        this.initializeTimeoutMiddleware();
        this.initializeDBConnectionCheckMiddleware();
        this.initializeAuthMiddleware();
        this.initializeBaseControllers();
        this.initializeControllers(controllers);
        this.initializePageNotFoundMiddleware();
        this.initializeErrorMiddleware();
        BaseApp.app = this;
    }
    static getInstance() {
        return this.app;
    }
    getAuthConfig() {
        return this.authConfig;
    }
    getConfig() {
        return this.config;
    }
    getDbConfig() {
        return this.dbConfig;
    }
    initializeTimeoutMiddleware() {
        this.app.use(timeout('5s'));
        this.app.use(bodyParser.json());
        this.app.use(timeoutMiddleware_1.timeoutMiddleware);
    }
    initializeAuthMiddleware() {
        if (this.config.isOAuthEnabled)
            this.app.use(authMiddleware_1.authMiddlware);
    }
    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`App listening on the port ${process.env.PORT}`);
        });
    }
    initializeDBConnectionCheckMiddleware() {
        this.app.use(checkForDBConnectionMiddleware_1.checkForDBConnectionHandler);
    }
    initializePageNotFoundMiddleware() {
        this.app.use(pageNotFoundMiddleware_1.pageNotFoundMiddleware);
    }
    initializeLoggerMiddleware() {
        this.app.use(loggerMiddleware_1.loggerMiddleware);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: false
        }));
    }
    initializeErrorMiddleware() {
        this.app.use(errorHandlerMiddleware_1.errorHandlerMiddleware);
    }
    initializeControllers(controllers) {
        controllers.forEach(controller => {
            this.app.use('/', controller.router);
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
    initializeBaseControllers() {
        this.app.use('/', new UserController_1.UserController('/' + Config_1.Config.collectionNames.users).router);
    }
}
exports.BaseApp = BaseApp;
