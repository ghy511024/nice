export declare type RouterProxyCallback = <TRequest, TResponse>(req?: TRequest, res?: TResponse, next?: () => void) => void;
export declare class RouterProxy {
    createProxy(targetCallback: RouterProxyCallback): <TRequest, TResponse>(req: TRequest, res: any, next: () => void) => Promise<void>;
}
