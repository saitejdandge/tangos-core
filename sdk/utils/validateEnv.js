"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEnv = void 0;
const envalid_1 = require("envalid");
function validateEnv() {
    envalid_1.cleanEnv(process.env, {
        MONGO_PASSWORD: envalid_1.str(),
        MONGO_PATH: envalid_1.str(),
        MONGO_USER: envalid_1.str(),
        PORT: envalid_1.port(),
    });
}
exports.validateEnv = validateEnv;
