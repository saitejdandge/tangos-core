import * as mongoose from 'mongoose';
import { DbConfig } from './db.config';

export class DBConnector {

  public static getDBInstance(): mongoose.Connection {
    return mongoose.connection;
  }
  private dbConfig: DbConfig;

  constructor(dbConfig: DbConfig) {
    this.dbConfig = dbConfig;
  }

  public connect(): Promise<typeof import('mongoose')> {
    const db = mongoose.connection;
    const uri = this.dbConfig.mongoUri;
    db.on('connecting', () => {
      console.log('connecting to MongoDB...');
    });
    db.on('error', (error) => {
      console.error('Error in MongoDb connection: ' + error);
      mongoose.disconnect();
    });
    db.on('connected', () => {
      console.log('MongoDB connected!');
    });
    db.once('open', () => {
      console.log('MongoDB connection opened!');
    });
    db.on('reconnected', () => {
      console.log('MongoDB reconnected!');
    });
    db.on('disconnected', () => {
      console.log('MongoDB disconnected!');
      mongoose.connect(uri, { server: { auto_reconnect: true } });
    });
    return mongoose.connect(
      this.dbConfig.mongoUri,
      this.dbConfig.options,
    );
  }
}
