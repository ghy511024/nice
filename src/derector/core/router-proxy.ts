export type RouterProxyCallback = <TRequest, TResponse>(
    req?: TRequest,
    res?: TResponse,
    next?: () => void,
) => void;

export class RouterProxy {
    public createProxy(
        targetCallback: RouterProxyCallback,
    ) {
        return async <TRequest, TResponse>(req: TRequest, res, next: () => void,) => {
            try {
                await targetCallback(req, res, next);
            } catch (e) {
                let obj = {}
                try {
                    obj = JSON.parse(e + '');
                } catch (e2) {
                    obj['code'] = -100
                    obj['desc'] = e + '';
                }
                let myc = "\x1B[0;31m"
                var time = `[${new Date().toLocaleString()}]`;
                var msg = myc + time + '\x1B[0m '
                console.error(msg, e)
                res.status(500);
                res.send(obj);
            }
        };
    }
}