export type RouterProxyCallback = <TRequest, TResponse>(
    req?: TRequest,
    res?: TResponse,
    next?: () => void,
) => void;
const flog = require('@fang/flog').getLog('RouterProxy')
const WM = require('wmonitor');
import {Config} from '../../Config';

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
                    obj['desc'] = 'system err';
                }
                obj["err"] = e;
                let myc = "\x1B[0;31m"
                let time = `[${new Date().toLocaleString()}]`;
                let msg = myc + time + '\x1B[0m '
                flog.err(msg, e)
                console.log(Config.getConfig())
                if (Config.getConfig()?.wmonitor?.error) {// 配置了错误上报
                    Config.getConfig()?.debug && flog.debug('wmonitor report system err', Config.getConfig().wmonitor.error)
                    WM.sum(Config.getConfig().wmonitor.error, 1)
                }

                res.status(500);
                res.send(obj);
            }
        };
    }
}