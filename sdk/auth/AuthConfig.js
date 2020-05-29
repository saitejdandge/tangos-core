"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthConfig {
    constructor(secret, isOAuthEnabled, authFreeEndPoints) {
        this.authFreeEndPoints = [];
        this.secret = secret;
        this.isOAuthEnabled = isOAuthEnabled;
        if (authFreeEndPoints != null)
            this.authFreeEndPoints = authFreeEndPoints;
    }
    getAuthFreeEndPoints() {
        return this.authFreeEndPoints;
    }
}
exports.AuthConfig = AuthConfig;
AuthConfig.collectionNames = {
    user_sessions: 'user_sessions',
    users: 'users',
};
