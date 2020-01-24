import { BaseModel } from './base.model';
import { Config } from '../Config';

export class UserModel extends BaseModel {
  collectionName: string = Config.collectionNames.users;
  schema: any = UserModel.getMongoSchema({
    name: String,
    creationDate: Date,
    email: String,
    address: JSON
  });
}
