export type RouterProxyCallback = <TRequest, TResponse>(
    req?: TRequest,
    res?: TResponse,
    next?: () => void,
) => void;

export class RouterProxy {
    public createProxy(
        targetCallback: RouterProxyCallback,
    ) {
        return async <TRequest, TResponse>(req: TRequest, res: TResponse, next: () => void,) => {
            try {
                await targetCallback(req, res, next);
            } catch (e) {
                // todo 要做一些事情
                console.log('my exception', e)
            }
        };
    }
}