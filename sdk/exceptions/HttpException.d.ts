export declare class HttpException extends Error {
    opStatus: number;
    result: number;
    message: string;
    constructor(result: number, opStatus: number, message: string);
}
