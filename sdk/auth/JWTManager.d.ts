import { BaseResponse } from '../responses/BaseResponse';
import { AuthConfig } from './AuthConfig';
export declare class JWTManager {
    authConfig: AuthConfig;
    constructor(authConfig: AuthConfig);
    createToken(userId: string): string;
    verifyToken(req: any): Promise<BaseResponse>;
    private checkUserSession;
}
