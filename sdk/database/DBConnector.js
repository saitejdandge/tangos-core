"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBConnector = void 0;
const mongoose = require("mongoose");
class DBConnector {
    constructor(dbConfig) {
        this.dbConfig = dbConfig;
    }
    static getDBInstance() {
        return DBConnector.db;
    }
    connect() {
        DBConnector.db = mongoose.connection;
        const uri = this.dbConfig.mongoUri;
        DBConnector.db.on('connecting', () => {
            console.log('connecting to MongoDB...');
        });
        DBConnector.db.on('error', (error) => {
            console.error('Error in MongoDb connection: ' + error);
            mongoose.disconnect();
        });
        DBConnector.db.on('connected', () => {
            console.log('MongoDB connected!');
        });
        DBConnector.db.once('open', () => {
            console.log('MongoDB connection opened!');
        });
        DBConnector.db.on('reconnected', () => {
            console.log('MongoDB reconnected!');
        });
        DBConnector.db.on('disconnected', () => {
            console.log('MongoDB disconnected!');
            mongoose.connect(uri, { server: { auto_reconnect: true } });
        });
        return mongoose.connect(this.dbConfig.mongoUri, this.dbConfig.options);
    }
}
exports.DBConnector = DBConnector;
