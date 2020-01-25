export class BaseResponse {

  public static getSuccessResponse(data: any): BaseResponse {
    return new BaseResponse(1, 'Success', data);
  }

  public static getEmptyResponse(): BaseResponse {
    return new BaseResponse(1, 'No data found', null);
  }

  public static getOAuthFreeEndpointResponse(): BaseResponse {
    return new BaseResponse(1, 'OAuth Free called', null);
  }

  public static getOAuthVerifiedResponse(): BaseResponse {
    return new BaseResponse(1, 'OAuth Verified', null);
  }

  public static getOAuthConfigDisabledResponse(): BaseResponse {
    return new BaseResponse(1, 'OAuth config disabled', null);
  }

  public static getAuthenticationSuccessResponse(userId: string): BaseResponse {
    return new BaseResponse(1, userId + 'Authenticated successfully', userId);
  }
  public result: number;
  public message: string;
  public data: any;

  constructor(result: number, message: string, data: any) {
    this.result = result;
    this.message = message;
    this.data = data;
  }
}
