"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseApp_1 = require("../BaseApp");
async function authMiddlware(request, response, next) {
    const jwtManager = BaseApp_1.BaseApp.getInstance().jwtManager;
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
