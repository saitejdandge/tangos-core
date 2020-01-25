import { Config } from '../Config';
import { BaseModel } from './base.model';

export class UserModel extends BaseModel {
  public collectionName: string = Config.collectionNames.users;
  public schema: any = UserModel.getMongoSchema({
    name: String,
    creationDate: Date,
    email: String,
    address: JSON,
  });
}
