export declare class CustomRoute {
    endPoint: string;
    handler: any;
    middlewares: any[];
    constructor(endPoint: string, handler: any, ...middlewares: any[]);
}
