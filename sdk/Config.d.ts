export declare class Config {
    isOAuthEnabled: boolean;
    private readonly authFreeEndPoints;
    static collectionNames: {
        user_sessions: string;
        users: string;
    };
    getAuthFreeEndPoints(): string[];
    constructor(isOAuthEnabled: boolean, authFreeEndPoints: string[]);
}
