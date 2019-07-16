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
                console.log('my exception', e);
            }
        });
    }
}
exports.RouterProxy = RouterProxy;
