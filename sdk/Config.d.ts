export declare class Config {
    static collectionNames: {
        user_sessions: string;
        users: string;
    };
    isOAuthEnabled: boolean;
    private readonly authFreeEndPoints;
    constructor(isOAuthEnabled: boolean, authFreeEndPoints: string[]);
    getAuthFreeEndPoints(): string[];
}
