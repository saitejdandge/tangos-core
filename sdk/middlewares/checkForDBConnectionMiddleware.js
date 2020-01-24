"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const DBConnectionException_1 = require("../exceptions/DBConnectionException");
function checkForDBConnectionHandler(request, response, next) {
    if (mongoose.connection.readyState != 1)
        throw new DBConnectionException_1.DBConnectionException();
    else
        next();
}
exports.checkForDBConnectionHandler = checkForDBConnectionHandler;
