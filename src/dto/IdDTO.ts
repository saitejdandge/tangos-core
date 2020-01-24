import { IsMongoId, IsNotEmpty } from 'class-validator';

export class IdDTO {
  @IsNotEmpty()
  @IsMongoId()
  public id: string = '';
}
