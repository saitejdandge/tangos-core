import { IsJSON, IsMongoId, IsNumber, IsNumberString } from 'class-validator';

export class BaseDTO {
  @IsJSON()
  public query: any;

  @IsJSON()
  public project: any;

  @IsJSON()
  public data: any;

  @IsJSON()
  public sort: any;

  @IsNumberString()
  public limit: any;

  @IsNumberString()
  public skip: any;

  @IsMongoId()
  public id: any;
}
