import { IsJSON, IsMongoId } from 'class-validator';

export class BaseDTO {
  @IsJSON()
  public query: any;

  @IsJSON()
  public data: any;

  @IsMongoId()
  public id: any;
}
