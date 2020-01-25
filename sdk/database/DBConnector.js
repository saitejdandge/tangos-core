"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
class DBConnector {
    constructor(dbConfig) {
        this.dbConfig = dbConfig;
    }
    connect() {
        const db = mongoose.connection;
        const uri = this.dbConfig.mongoUri;
        db.on('connecting', () => {
            console.log('connecting to MongoDB...');
        });
        db.on('error', (error) => {
            console.error('Error in MongoDb connection: ' + error);
            mongoose.disconnect();
        });
        db.on('connected', () => {
            console.log('MongoDB connected!');
        });
        db.once('open', () => {
            console.log('MongoDB connection opened!');
        });
        db.on('reconnected', () => {
            console.log('MongoDB reconnected!');
        });
        db.on('disconnected', () => {
            console.log('MongoDB disconnected!');
            mongoose.connect(uri, { server: { auto_reconnect: true } });
        });
        return mongoose.connect(this.dbConfig.mongoUri, this.dbConfig.options);
    }
}
exports.DBConnector = DBConnector;
