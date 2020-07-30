"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseModel = void 0;
const mongoose = require("mongoose");
class BaseModel {
    static getMongoSchema(schema) {
        return new mongoose.Schema(schema, { versionKey: false });
    }
    getModelSchema() {
        return mongoose.model(this.collectionName, this.schema);
    }
}
exports.BaseModel = BaseModel;
