"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const AuthenticationTokenMissingException_1 = require("../exceptions/AuthenticationTokenMissingException");
const InvalidParamsException_1 = require("../exceptions/InvalidParamsException");
const SessionExpiredException_1 = require("../exceptions/SessionExpiredException");
const StandardException_1 = require("../exceptions/StandardException");
const BaseResponse_1 = require("../responses/BaseResponse");
const DBConnector_1 = require("./../database/DBConnector");
class JWTManager {
    constructor(authConfig) {
        this.authConfig = authConfig;
    }
    createToken(userId) {
        console.log('Creating token for ', userId);
        // user_id = user_id + '';
        return jwt.sign({ id: userId, isActive: true }, this.authConfig.secret, {
            expiresIn: 86400,
        });
    }
    verifyToken(req) {
        const token = req.headers.token;
        const oAuthFreeCalls = this.authConfig.getAuthFreeEndPoints();
        // check header or url parameters or post parameters for token
        return new Promise(async (resolve, reject) => {
            if (this.authConfig.isOAuthEnabled) {
                if (!oAuthFreeCalls.includes(req.originalUrl)) {
                    // let token = req.headers["token"];
                    //
                    if (!token)
                        reject(new AuthenticationTokenMissingException_1.AuthenticationTokenMissingException());
                    // verifies secret and checks exp
                    try {
                        const decoded = await jwt.verify(token, this.authConfig.secret);
                        // if everything is good, save to request for use in other routes
                        // req.userId = decoded.id;
                        const userId = decoded.id;
                        const checkUserSessionResponse = await this.checkUserSession(userId, token);
                        resolve(checkUserSessionResponse);
                    }
                    catch (e) {
                        reject(e);
                    }
                }
                else
                    resolve(BaseResponse_1.BaseResponse.getOAuthFreeEndpointResponse());
            }
            else
                resolve(BaseResponse_1.BaseResponse.getOAuthConfigDisabledResponse());
        });
    }
    async checkUserSession(userId, token) {
        return new Promise((resolve, reject) => {
            if (userId != null && token != null) {
                DBConnector_1.DBConnector.getDBInstance().collection('user_sessions')
                    .findOne({ user_id: userId }, (err, res) => {
                    if (err == null) {
                        if (res != null && res.token === token) {
                            resolve(BaseResponse_1.BaseResponse.getAuthenticationSuccessResponse(userId));
                        }
                        else {
                            reject(new SessionExpiredException_1.SessionExpiredException());
                        }
                    }
                    else {
                        reject(new StandardException_1.StandardException());
                    }
                });
            }
            else
                reject(new InvalidParamsException_1.InvalidParamsException());
        });
    }
}
exports.JWTManager = JWTManager;
