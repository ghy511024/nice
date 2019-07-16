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
const WFManager = require("wfmanager");
class Nice {
    constructor(app, config) {
        this.routesResolver = new RoutesResolver_1.RoutesResolver(app);
        this.config = config;
        this.app = app;
        this.initWF();
    }
    use(...handlers) {
        if (handlers.length >= 1) {
            let rootPath = '';
            if (typeof handlers[0] == 'string') {
                rootPath = handlers[0];
                handlers.splice(0, 1);
            }
            for (var i = 0; i < handlers.length; i++) {
                this.routesResolver.registerRouters(handlers[i], rootPath);
            }
        }
    }
    initWF() {
        this.app.use(WFManager.express());
        setTimeout(() => {
            let option = { urls: this.routesResolver.getAllPaths() };
            if (this.config && this.config.wf) {
                option = Object.assign(option, this.config.wf);
            }
            WFManager.init(option);
        }, 100);
    }
}
exports.Nice = Nice;
