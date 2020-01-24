import { IsJSON, IsNotEmpty } from 'class-validator';

export class DataDTO {
  @IsNotEmpty()
  @IsJSON()
  public data: any;
}
