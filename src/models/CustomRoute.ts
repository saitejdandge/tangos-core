export class CustomRoute {
  endPoint: string;
  handler: any;
  middlewares: any[];

  constructor(endPoint: string, handler: any, ...middlewares: any[]) {
    this.endPoint = endPoint;
    this.handler = handler;
    this.middlewares = middlewares;
  }
}
