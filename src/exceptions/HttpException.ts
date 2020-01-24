export class HttpException extends Error {
  opStatus: number;
  result: number;
  message: string;

  constructor(result: number, opStatus: number, message: string) {
    super(message);
    this.opStatus = opStatus;
    this.result = result;
    this.message = message;
  }
}
