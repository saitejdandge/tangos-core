import * as jwt from 'jsonwebtoken';
import { Config } from '../Config';
import { AuthenticationTokenMissingException } from '../exceptions/AuthenticationTokenMissingException';
import { InvalidParamsException } from '../exceptions/InvalidParamsException';
import { SessionExpiredException } from '../exceptions/SessionExpiredException';
import { BaseResponse } from '../responses/BaseResponse';
import { AuthConfig } from './AuthConfig';

export class JWTManager {
  public authConfig: AuthConfig;
  public config: Config;

  constructor(authConfig: AuthConfig, config: Config) {
    this.authConfig = authConfig;
    this.config = config;
  }

  public createToken(userId: string): string {
    console.log('Creating token for ', userId);
    // user_id = user_id + '';
    return jwt.sign({ id: userId, isActive: true }, this.authConfig.secret, {
      expiresIn: 86400, // expires in 24 hours
    });
  }

  public verifyToken(req: any): Promise<BaseResponse> {
    const token = this.createToken('hello');
    console.log(token);
    const oAuthFreeCalls = this.config.getAuthFreeEndPoints();
    // check header or url parameters or post parameters for token
    return new Promise(async (resolve, reject) => {
      if (this.config.isOAuthEnabled) {
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
            // reject(e);
            reject(new SessionExpiredException());
          }
        } else resolve(BaseResponse.getOAuthFreeEndpointResponse());
      } else resolve(BaseResponse.getOAuthConfigDisabledResponse());
    });
  }

  private async checkUserSession(
    userId: string,
    token: string,
  ): Promise<BaseResponse> {
    return new Promise((resolve, reject) => {
      if (userId != null && token != null) {
        reject(new InvalidParamsException());
        //
        // let db = mongoose.connection;
        // db.collection("user_sessions")
        //     .findOne({user_id: user_id}, (err, res) => {
        //
        //         if (err == null) {
        //             if (res != null && res.token == token) {
        //
        //                 resolve(BaseResponse.getAuthenticationSuccessResponse(user_id));
        //             } else
        //                 reject(new SessionExpiredException());
        //         } else
        //             reject(new StandardException());
        //     });
      } else reject(new InvalidParamsException());
    });
  }
}
