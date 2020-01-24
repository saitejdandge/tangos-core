import { DbConfig } from './db.config';
export declare class DBConnector {
    private dbConfig;
    constructor(dbConfig: DbConfig);
    connect(): Promise<typeof import('mongoose')>;
}
