import * as mongoose from 'mongoose';
import { BaseInterface } from './base.interface';

export abstract class BaseModel implements BaseInterface {

  public static getMongoSchema(schema: any) {
    return new mongoose.Schema(schema, { versionKey: false });
  }
  // tslint:disable-next-line: variable-name
  public _id: any;
  public abstract collectionName: string;
  public abstract schema: any;

  public getModelSchema() {
    return mongoose.model<BaseInterface & mongoose.Document>(
      this.collectionName,
      this.schema,
    );
  }
}
