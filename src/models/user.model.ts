import { AuthConfig } from './../auth/AuthConfig';
import { BaseModel } from './base.model';

export class UserModel extends BaseModel {
  public collectionName: string = AuthConfig.collectionNames.users;
  public schema: any = UserModel.getMongoSchema({
    name: String,
    creationDate: Date,
    email: String,
    address: JSON,
  });
}
