import * as express from 'express';

import * as mongoose from 'mongoose';
import { DBConnectionException } from '../exceptions/DBConnectionException';

export function checkForDBConnectionHandler(
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) {
  if (mongoose.connection.readyState != 1) throw new DBConnectionException();
  else next();
}
