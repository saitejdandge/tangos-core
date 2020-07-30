import * as mongoose from 'mongoose';
import { DbConfig } from './db.config';
export declare class DBConnector {
    static getDBInstance(): mongoose.Connection;
    private static db;
    private dbConfig;
    constructor(dbConfig: DbConfig);
    connect(): Promise<typeof import('mongoose')>;
}
