"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
function getJWTToken(secret, userId) {
    const token = jwt.sign({ id: userId, isActive: true }, secret, {
        expiresIn: 86400,
    });
}
exports.getJWTToken = getJWTToken;
