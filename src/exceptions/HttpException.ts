import ErrorModel from "../models/ErrorModel";

export class HttpException extends Error {

  public errorModel!: ErrorModel;
  constructor(errorModel: ErrorModel) {
    super(errorModel.title);
    this.errorModel = errorModel;
  }

}
