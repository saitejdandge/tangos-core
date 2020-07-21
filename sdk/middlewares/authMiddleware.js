"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function authMiddlware(request, response, next) {
    next();
    // const jwtManager = BaseApp.getInstance().jwtManager;
    // try {
    //   const res = await jwtManager.verifyToken(request);
    //   if (res.result === 1) next();
    // } catch (e) {
    //   next(e);
    // }
}
exports.authMiddlware = authMiddlware;
