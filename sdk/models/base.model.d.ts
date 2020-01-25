import * as mongoose from 'mongoose';
import { BaseInterface } from './base.interface';
export declare abstract class BaseModel implements BaseInterface {
    static getMongoSchema(schema: any): mongoose.Schema<any>;
    _id: any;
    abstract collectionName: string;
    abstract schema: any;
    getModelSchema(): mongoose.Model<BaseInterface & mongoose.Document, {}>;
}
