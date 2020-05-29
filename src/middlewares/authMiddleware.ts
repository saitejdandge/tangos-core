import * as express from 'express';

import { JWTManager } from '../auth/JWTManager';
import { BaseApp } from '../BaseApp';

export async function authMiddlware(
  request: express.Request,
  response: express.Response,
  next: express.NextFunction,
) {
  const jwtManager = new JWTManager(
    BaseApp.getInstance().getAuthConfig()
  );
  try {
    const res = await jwtManager.verifyToken(request);
    if (res.result === 1) next();
  } catch (e) {
    next(e);
  }
}
