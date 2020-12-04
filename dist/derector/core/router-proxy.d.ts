export declare type RouterProxyCallback = <TRequest, TResponse>(req?: TRequest, res?: TResponse, next?: (err?: any, req?: any, res?: any, next?: any) => void) => void;
export declare class RouterProxy {
    createProxy(targetCallback: RouterProxyCallback): <TRequest, TResponse>(req: TRequest, res: any, next: (err: any, req: any, res: any, next: any) => void) => Promise<void>;
}
