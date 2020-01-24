import * as mongoose from 'mongoose';
import { BaseInterface } from './base.interface';

export abstract class BaseModel implements BaseInterface {
  _id: any;
  abstract collectionName: string;
  abstract schema: any;

  getModelSchema() {
    return mongoose.model<BaseInterface & mongoose.Document>(
      this.collectionName,
      this.schema
    );
  }

  static getMongoSchema(schema: any) {
    return new mongoose.Schema(schema, { versionKey: false });
  }
}
