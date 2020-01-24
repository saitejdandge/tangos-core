export declare class BaseResponse {
    result: number;
    message: string;
    data: any;
    constructor(result: number, message: string, data: any);
    static getSuccessResponse(data: any): BaseResponse;
    static getEmptyResponse(): BaseResponse;
    static getOAuthFreeEndpointResponse(): BaseResponse;
    static getOAuthVerifiedResponse(): BaseResponse;
    static getOAuthConfigDisabledResponse(): BaseResponse;
    static getAuthenticationSuccessResponse(user_id: string): BaseResponse;
}
