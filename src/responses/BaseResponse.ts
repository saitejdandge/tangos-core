export class BaseResponse {
  result: number;
  message: string;
  data: any;

  constructor(result: number, message: string, data: any) {
    this.result = result;
    this.message = message;
    this.data = data;
  }

  static getSuccessResponse(data: any): BaseResponse {
    return new BaseResponse(1, 'Success', data);
  }

  static getEmptyResponse(): BaseResponse {
    return new BaseResponse(1, 'No data found', null);
  }

  static getOAuthFreeEndpointResponse(): BaseResponse {
    return new BaseResponse(1, 'OAuth Free called', null);
  }

  static getOAuthVerifiedResponse(): BaseResponse {
    return new BaseResponse(1, 'OAuth Verified', null);
  }

  static getOAuthConfigDisabledResponse(): BaseResponse {
    return new BaseResponse(1, 'OAuth config disabled', null);
  }

  static getAuthenticationSuccessResponse(user_id: string): BaseResponse {
    return new BaseResponse(1, user_id + 'Authenticated successfully', user_id);
  }
}
