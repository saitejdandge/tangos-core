import strings from '../constants/strings';

export class BaseResponse {

  public static getSuccessResponse(data: any, message: any): BaseResponse {
    return new BaseResponse(1, message != null ? message : strings.success, data);
  }

  public static getFailureResponse(message: any): BaseResponse {
    return new BaseResponse(0, message != null ? message : strings.success, null);
  }
  public static getEmptyResponse(): BaseResponse {
    return new BaseResponse(1, strings.noDataFound, null);
  }

  public static getOAuthFreeEndpointResponse(): BaseResponse {
    return new BaseResponse(1, strings.oAuthFreeCalled, null);
  }

  public static getOAuthVerifiedResponse(): BaseResponse {
    return new BaseResponse(1, strings.oAuthVerified, null);
  }

  public static getOAuthConfigDisabledResponse(): BaseResponse {
    return new BaseResponse(1, strings.oAuthConfigDisabled, null);
  }

  public static getAuthenticationSuccessResponse(userId: string): BaseResponse {
    return new BaseResponse(1, userId + strings.authSuccessful, userId);
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
