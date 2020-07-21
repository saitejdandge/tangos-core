import * as jwt from 'jsonwebtoken';
import { AuthenticationTokenMissingException } from '../exceptions/AuthenticationTokenMissingException';
import { InvalidParamsException } from '../exceptions/InvalidParamsException';
import { SessionExpiredException } from '../exceptions/SessionExpiredException';
import { StandardException } from '../exceptions/StandardException';
import { BaseResponse } from '../responses/BaseResponse';
import { DBConnector } from './../database/DBConnector';
import { AuthConfig } from './AuthConfig';
export class JWTManager {
  public authConfig: AuthConfig;

  constructor(authConfig: AuthConfig) {
    this.authConfig = authConfig;
  }

  public createToken(userId: string): string {
    return jwt.sign({ id: userId, isActive: true }, this.authConfig.secret, {
      expiresIn: 86400, // expires in 24 hours
    });
  }

  public verifyToken(req: any): Promise<BaseResponse> {
    const token = req.headers.token;
    const oAuthFreeCalls = this.authConfig.getAuthFreeEndPoints();
    // check header or url parameters or post parameters for token
    return new Promise(async (resolve, reject) => {
      if (this.authConfig.isOAuthEnabled) {
        if (!oAuthFreeCalls.includes(req.originalUrl)) {
          // let token = req.headers["token"];
          //
          if (!token) reject(new AuthenticationTokenMissingException());
          // verifies secret and checks exp

          try {
            const decoded: any = await jwt.verify(token, this.authConfig.secret);
            // if everything is good, save to request for use in other routes
            // req.userId = decoded.id;
            const userId = decoded.id;
            const checkUserSessionResponse = await this.checkUserSession(
              userId,
              token,
            );
            resolve(checkUserSessionResponse);
          } catch (e) {
            reject(e);
          }
        } else resolve(BaseResponse.getOAuthFreeEndpointResponse());
      } else resolve(BaseResponse.getOAuthConfigDisabledResponse());
    });
  }

  private async checkUserSession(userId: string, token: string): Promise<BaseResponse> {
    return new Promise((resolve, reject) => {
      if (userId != null && token != null) {
        DBConnector.getDBInstance().collection('user_sessions')
          .findOne({ user_id: userId }, (err: any, res: any) => {
            if (err == null) {
              if (res != null && res.token === token) {
                resolve(BaseResponse.getAuthenticationSuccessResponse(userId));
              } else {
                reject(new SessionExpiredException());
              }
            } else {
              reject(new StandardException());
            }
          });
      } else reject(new InvalidParamsException());
    });
  }
}
