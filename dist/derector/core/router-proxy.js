"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterProxy = void 0;
const FLog_1 = require("../../Log/FLog");
const flog = new FLog_1.Flog('fang-router/RouterProxy');
const WM = require('@wb/wmonitor');
const Config_1 = require("../../Config");
class RouterProxy {
    createProxy(targetCallback) {
        return async (req, res, next) => {
            var _a, _b, _c;
            try {
                await targetCallback(req, res, next);
            }
            catch (e) {
                let obj = {};
                if (e instanceof Error && e['code'] !== undefined) {
                    obj['code'] = e['code'];
                    obj['desc'] = e['desc'];
                    obj['message'] = e.message;
                    obj['stack'] = e.stack;
                }
                else {
                    obj['code'] = -100;
                    obj['desc'] = 'system err';
                }
                obj["err"] = e;
                let myc = "\x1B[0;31m";
                let time = `[${new Date().toLocaleString()}]`;
                let msg = myc + time + '\x1B[0m ';
                if ((_b = (_a = Config_1.Config.getConfig()) === null || _a === void 0 ? void 0 : _a.wmonitor) === null || _b === void 0 ? void 0 : _b.error) {
                    ((_c = Config_1.Config.getConfig()) === null || _c === void 0 ? void 0 : _c.debug) && flog.debug('wmonitor report system err', Config_1.Config.getConfig().wmonitor.error);
                    WM.sum(Config_1.Config.getConfig().wmonitor.error, 1);
                }
                return next(e, req, res, next);
            }
        };
    }
}
exports.RouterProxy = RouterProxy;
