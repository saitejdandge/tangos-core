"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = require("../Config");
const base_model_1 = require("./base.model");
class UserModel extends base_model_1.BaseModel {
    constructor() {
        super(...arguments);
        this.collectionName = Config_1.Config.collectionNames.users;
        this.schema = UserModel.getMongoSchema({
            name: String,
            creationDate: Date,
            email: String,
            address: JSON,
        });
    }
}
exports.UserModel = UserModel;
