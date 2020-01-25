export class HttpException extends Error {
  public opStatus: number;
  public result: number;
  public message: string;

  constructor(result: number, opStatus: number, message: string) {
    super(message);
    this.opStatus = opStatus;
    this.result = result;
    this.message = message;
  }
}
