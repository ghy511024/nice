"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const flog = require('@fang/flog').getLog('RouterProxy');
const WM = require('wmonitor');
const Config_1 = require("../../Config");
class RouterProxy {
    createProxy(targetCallback) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                yield targetCallback(req, res, next);
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
                obj['stack'] = e.stack;
                obj['message'] = e.message;
                let myc = "\x1B[0;31m";
                let time = `[${new Date().toLocaleString()}]`;
                let msg = myc + time + '\x1B[0m ';
                flog.err(msg, e);
                console.log(Config_1.Config.getConfig());
                if (((_b = (_a = Config_1.Config.getConfig()) === null || _a === void 0 ? void 0 : _a.wmonitor) === null || _b === void 0 ? void 0 : _b.error) && ((_c = Config_1.Config.getConfig()) === null || _c === void 0 ? void 0 : _c.debug)) {
                    flog.debug('wmonitor report system err', Config_1.Config.getConfig().wmonitor.error);
                    WM.sum(Config_1.Config.getConfig().wmonitor.error, 1);
                }
                res.status(500);
                res.send(obj);
            }
        });
    }
}
exports.RouterProxy = RouterProxy;
