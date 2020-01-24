import { DbConfig } from './db.config';
import * as mongoose from 'mongoose';

export class DBConnector {
  private dbConfig: DbConfig;

  constructor(dbConfig: DbConfig) {
    this.dbConfig = dbConfig;
  }

  public connect(): Promise<typeof import('mongoose')> {
    let db = mongoose.connection;
    let uri = this.dbConfig.mongoUri;
    db.on('connecting', function() {
      console.log('connecting to MongoDB...');
    });
    db.on('error', function(error) {
      console.error('Error in MongoDb connection: ' + error);
      mongoose.disconnect();
    });
    db.on('connected', function() {
      console.log('MongoDB connected!');
    });
    db.once('open', function() {
      console.log('MongoDB connection opened!');
    });
    db.on('reconnected', function() {
      console.log('MongoDB reconnected!');
    });
    db.on('disconnected', function() {
      console.log('MongoDB disconnected!');
      mongoose.connect(uri, { server: { auto_reconnect: true } });
    });
    return mongoose.connect(
      this.dbConfig.mongoUri,
      this.dbConfig.options
      // function (error) {
      //     // Check error in initial connection. There is no 2nd param to the callback.
      //     console.log("Database connection initiated...");
      //     if (error == null)
      //         console.log("Connection Successful...");
      //     else
      //         console.log("Error in connecting to database... ");
      // }
    );
  }
}
