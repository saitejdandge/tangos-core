export declare class DbConfig {
    private readonly mongoUser;
    private readonly mongoPassword;
    private readonly mongoPath;
    mongoUri: string;
    options: any;
    constructor(mongoUser: any, mongoPassword: any, mongoPath: any, options: any);
    private generateUri;
}
