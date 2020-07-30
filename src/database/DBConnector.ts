import * as mongoose from 'mongoose';
import { DbConfig } from './db.config';

export class DBConnector {

  public static getDBInstance(): mongoose.Connection {
    return DBConnector.db;
  }

  private static db: mongoose.Connection;
  private dbConfig: DbConfig;

  constructor(dbConfig: DbConfig) {
    this.dbConfig = dbConfig;
  }
  public connect(): Promise<typeof import('mongoose')> {
    DBConnector.db = mongoose.connection;
    const uri = this.dbConfig.mongoUri;
    DBConnector.db.on('connecting', () => {
      console.log('connecting to MongoDB...');
    });
    DBConnector.db.on('error', (error: any) => {
      console.error('Error in MongoDb connection: ' + error);
      mongoose.disconnect();
    });
    DBConnector.db.on('connected', () => {
      console.log('MongoDB connected!');
    });
    DBConnector.db.once('open', () => {
      console.log('MongoDB connection opened!');
    });
    DBConnector.db.on('reconnected', () => {
      console.log('MongoDB reconnected!');
    });
    DBConnector.db.on('disconnected', () => {
      console.log('MongoDB disconnected!');
      mongoose.connect(uri, { server: { auto_reconnect: true } });
    });
    return mongoose.connect(
      this.dbConfig.mongoUri,
      this.dbConfig.options,
    );
  }
}
