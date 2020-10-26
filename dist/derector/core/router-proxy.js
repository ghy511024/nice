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
class RouterProxy {
    createProxy(targetCallback) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
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
                    obj['desc'] = '系统异常';
                }
                obj["err"] = e;
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
