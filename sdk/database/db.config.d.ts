export declare class DbConfig {
    mongoUri: string;
    options: any;
    private readonly mongoUser;
    private readonly mongoPassword;
    private readonly mongoPath;
    constructor(mongoUser: any, mongoPassword: any, mongoPath: any, options: any);
    private generateUri;
}
