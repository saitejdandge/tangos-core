import { AuthConfig } from './auth/AuthConfig';
import { JWTManager } from './auth/JWTManager';
import { BaseController } from './controllers/BaseController';
import { DbConfig } from './database/db.config';
import { DBConnector } from './database/DBConnector';
import { BaseDTO } from './dto/baseDTO';
import { DataDTO } from './dto/dataDTO';
import { IdDTO } from './dto/IdDTO';

import { AuthenticationTokenMissingException } from './exceptions/AuthenticationTokenMissingException';
import { DBConnectionException } from './exceptions/DBConnectionException';
import { HttpException } from './exceptions/HttpException';
import { InvalidHandlerException } from './exceptions/InvalidHandlerException';
import { InvalidParamsException } from './exceptions/InvalidParamsException';
import { PageNotFoundException } from './exceptions/PageNotFoundException';
import { StandardException } from './exceptions/StandardException';
import { TimeoutException } from './exceptions/TimeoutException';
import { validationMiddleware } from './middlewares/validationMiddleware';
import { BaseInterface } from './models/base.interface';
import { BaseModel } from './models/base.model';
import { CustomRoute } from './models/CustomRoute';

import * as mongoose from 'mongoose';
import { BaseApp } from './BaseApp';
import { Config } from './Config';
import { BasePresenter } from './presenters/BasePresenter';
import { BaseResponse } from './responses/BaseResponse';
import { CommonEndPoints } from './utils/CommonEndPoints';
import { validateEnv } from './utils/validateEnv';

const getDB = () => {
  return mongoose.connection;
};
export default {
  getDB,
  AuthConfig,
  JWTManager,
  BaseController,
  DbConfig,
  DBConnector,
  validationMiddleware,
  BaseDTO,
  IdDTO,
  AuthenticationTokenMissingException,
  DBConnectionException,
  HttpException,
  InvalidHandlerException,
  InvalidParamsException,
  PageNotFoundException,
  StandardException,
  TimeoutException,
  // BaseInterface,
  BaseModel,
  CustomRoute,
  BaseResponse,
  BasePresenter,
  CommonEndPoints,
  validateEnv,
  BaseApp,
  Config,

};
