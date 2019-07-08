"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RoutesResolver_1 = require("./derector/core/RoutesResolver");
var fun_decorator_1 = require("./fun.decorator");
exports.Controller = fun_decorator_1.Controller;
exports.Get = fun_decorator_1.Get;
exports.Post = fun_decorator_1.Post;
exports.Delete = fun_decorator_1.Delete;
exports.Put = fun_decorator_1.Put;
exports.Patch = fun_decorator_1.Patch;
exports.Options = fun_decorator_1.Options;
exports.Head = fun_decorator_1.Head;
exports.All = fun_decorator_1.All;
exports.Filter = fun_decorator_1.Filter;
exports.Mid = fun_decorator_1.Mid;
class Nice {
    constructor(app) {
        this.routesResolver = new RoutesResolver_1.RoutesResolver(app);
    }
    use(...handlers) {
        if (handlers.length >= 1) {
            let rootPath = '';
            if (typeof handlers[0] == 'string') {
                rootPath = handlers[0];
                handlers = handlers.splice(0, 1);
            }
            for (var i = 0; i < handlers.length; i++) {
                this.routesResolver.registerRouters(handlers[i], rootPath);
            }
        }
    }
}
exports.Nice = Nice;
