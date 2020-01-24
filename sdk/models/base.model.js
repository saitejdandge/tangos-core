"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
class BaseModel {
    getModelSchema() {
        return mongoose.model(this.collectionName, this.schema);
    }
    static getMongoSchema(schema) {
        return new mongoose.Schema(schema, { versionKey: false });
    }
}
exports.BaseModel = BaseModel;
