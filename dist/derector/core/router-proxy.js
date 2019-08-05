"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
class RouterProxy {
    createProxy(targetCallback) {
        return (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield targetCallback(req, res, next);
            }
            catch (e) {
                let obj = {};
                try {
                    obj = JSON.parse(e + '');
                }
                catch (e2) {
                    obj['code'] = -100;
                    obj['desc'] = e + '';
                }
                let myc = "\x1B[0;31m";
                var time = `[${new Date().toLocaleString()}]`;
                var msg = myc + time + '\x1B[0m ';
                console.error(msg, e);
                res.status(500);
                res.send(obj);
            }
        });
    }
}
exports.RouterProxy = RouterProxy;
