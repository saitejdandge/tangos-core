import * as express from 'express';
import { HttpException } from '../exceptions/HttpException';

// dont remove last argument
export function errorHandlerMiddleware(
  error: HttpException,
  request: express.Request,
  response: express.Response,
  next: express.NextFunction,
) {

  if (error.errorModel != null) {
    const opStatus = (error.errorModel.opStatus != null ? error.errorModel.opStatus : 500);
    const message = error.errorModel.subTitle || 'Something went wrong';

    let responseValue: any = {
      opStatus,
      message,
      result: 0,
    };
    if (error.errorModel.subTitle)
      responseValue.subTitle = error.errorModel.subTitle;

    if (error.errorModel.image)
      responseValue.image = error.errorModel.image;

    response.json(responseValue);
  }
  else{
    response.json({result:0,message:'Something went wrong',opStatus:500})
  }
}
