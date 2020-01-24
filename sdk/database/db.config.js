"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DbConfig {
    constructor(mongoUser, mongoPassword, mongoPath, options) {
        this.mongoUser = mongoUser;
        this.mongoPassword = mongoPassword;
        this.mongoPath = mongoPath;
        this.mongoUri = this.generateUri();
        this.options = options;
    }
    generateUri() {
        return `mongodb://${this.mongoUser}:${this.mongoPassword}${this.mongoPath}`;
    }
}
exports.DbConfig = DbConfig;
