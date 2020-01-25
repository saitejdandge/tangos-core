"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Config {
    constructor(isOAuthEnabled, authFreeEndPoints) {
        this.authFreeEndPoints = [];
        this.isOAuthEnabled = isOAuthEnabled;
        if (authFreeEndPoints != null)
            this.authFreeEndPoints = authFreeEndPoints;
    }
    getAuthFreeEndPoints() {
        return this.authFreeEndPoints;
    }
}
exports.Config = Config;
Config.collectionNames = {
    user_sessions: 'user_sessions',
    users: 'users',
};
