import { Config } from '../Config';
import { BaseResponse } from '../responses/BaseResponse';
import { AuthConfig } from './AuthConfig';
export declare class JWTManager {
    authConfig: AuthConfig;
    config: Config;
    constructor(authConfig: AuthConfig, config: Config);
    createToken(user_id: string): string;
    verifyToken(req: any): Promise<BaseResponse>;
    private checkUserSession;
}
