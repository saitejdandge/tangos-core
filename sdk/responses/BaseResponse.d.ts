export declare class BaseResponse {
    static getSuccessResponse(data: any, message: any): BaseResponse;
    static getFailureResponse(): BaseResponse;
    static getEmptyResponse(): BaseResponse;
    static getOAuthFreeEndpointResponse(): BaseResponse;
    static getOAuthVerifiedResponse(): BaseResponse;
    static getOAuthConfigDisabledResponse(): BaseResponse;
    static getAuthenticationSuccessResponse(userId: string): BaseResponse;
    result: number;
    message: string;
    data: any;
    constructor(result: number, message: string, data: any);
}
