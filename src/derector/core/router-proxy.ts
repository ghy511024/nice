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
                if (e instanceof Error && e['code'] !== undefined) {
                    obj['code'] = e['code'];
                    obj['desc'] = e['desc'];
                    obj['message'] = e.message;
                    obj['stack'] = e.stack;
                } else {
                    obj['code'] = -100
                    obj['desc'] = '系统异常';
                }
                obj['stack'] = e.stack;
                obj['message'] = e.message;

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