export class CustomRoute {
  public endPoint: string;
  public handler: any;
  public middlewares: any[];

  constructor(endPoint: string, handler: any, ...middlewares: any[]) {
    this.endPoint = endPoint;
    this.handler = handler;
    this.middlewares = middlewares;
  }
}
