"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strings_1 = require("../constants/strings");
class BaseResponse {
    constructor(result, message, data) {
        this.result = result;
        this.message = message;
        this.data = data;
    }
    static getSuccessResponse(data, message) {
        return new BaseResponse(1, message != null ? message : strings_1.default.success, data);
    }
    static getFailureResponse() {
        return new BaseResponse(0, strings_1.default.standardErrorMessage, null);
    }
    static getEmptyResponse() {
        return new BaseResponse(1, strings_1.default.noDataFound, null);
    }
    static getOAuthFreeEndpointResponse() {
        return new BaseResponse(1, strings_1.default.oAuthFreeCalled, null);
    }
    static getOAuthVerifiedResponse() {
        return new BaseResponse(1, strings_1.default.oAuthVerified, null);
    }
    static getOAuthConfigDisabledResponse() {
        return new BaseResponse(1, strings_1.default.oAuthConfigDisabled, null);
    }
    static getAuthenticationSuccessResponse(userId) {
        return new BaseResponse(1, userId + strings_1.default.authSuccessful, userId);
    }
}
exports.BaseResponse = BaseResponse;
