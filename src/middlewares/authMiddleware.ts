import * as express from 'express';

import { JWTManager } from '../auth/JWTManager';
import { BaseApp } from '../BaseApp';

export async function authMiddlware(
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) {
  let jwtManager = new JWTManager(
    BaseApp.getInstance().getAuthConfig(),
    BaseApp.getInstance().getConfig()
  );
  try {
    let res = await jwtManager.verifyToken(request);
    if (res.result == 1) next();
  } catch (e) {
    next(e);
  }
}
