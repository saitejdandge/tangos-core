"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JWTManager_1 = require("../auth/JWTManager");
const BaseApp_1 = require("../BaseApp");
async function authMiddlware(request, response, next) {
    const jwtManager = new JWTManager_1.JWTManager(BaseApp_1.BaseApp.getInstance().getAuthConfig(), BaseApp_1.BaseApp.getInstance().getConfig());
    try {
        const res = await jwtManager.verifyToken(request);
        if (res.result === 1)
            next();
    }
    catch (e) {
        next(e);
    }
}
exports.authMiddlware = authMiddlware;
