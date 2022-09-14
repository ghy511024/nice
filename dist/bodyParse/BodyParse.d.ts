/// <reference types="node" />
import http from "http";
declare type BodyOption = {
    inflate?: boolean | undefined;
    limit?: number | string | undefined;
    type?: string | string[] | ((req: http.IncomingMessage) => any) | undefined;
    verify?(req: http.IncomingMessage, res: http.ServerResponse, buf: Buffer, encoding: string): void;
};
interface OptionsJson extends BodyOption {
    reviver?(key: string, value: any): any;
    strict?: boolean | undefined;
}
interface OptionsUrlencoded extends BodyOption {
    extended?: boolean | undefined;
    parameterLimit?: number | undefined;
}
export declare class BodyParse {
    static json(option?: OptionsJson): (req: any, res: any, next: any) => void;
    static urlencoded(option?: OptionsUrlencoded): (req: any, res: any, next: any) => void;
}
export {};
