"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuthConfig_1 = require("./../auth/AuthConfig");
const base_model_1 = require("./base.model");
class UserModel extends base_model_1.BaseModel {
    constructor() {
        super(...arguments);
        this.collectionName = AuthConfig_1.AuthConfig.collectionNames.users;
        this.schema = UserModel.getMongoSchema({
            name: String,
            creationDate: Date,
            email: String,
            address: JSON,
        });
    }
}
exports.UserModel = UserModel;
