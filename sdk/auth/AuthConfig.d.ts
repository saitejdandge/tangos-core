export declare class AuthConfig {
    static collectionNames: {
        user_sessions: string;
        users: string;
    };
    secret: string;
    isOAuthEnabled: boolean;
    private readonly authFreeEndPoints;
    constructor(secret: string, isOAuthEnabled: boolean, authFreeEndPoints: string[]);
    getAuthFreeEndPoints(): string[];
}
