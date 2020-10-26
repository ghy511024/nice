"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicRouter = void 0;
const RoutesResolver_1 = require("./derector/core/RoutesResolver");
const Config_1 = require("./Config");
class BasicRouter {
    constructor(app, config) {
        this.layers = [];
        this.exlayers = [];
        this.config = config || {};
        Config_1.Config.setConfig(config);
        this.app = app;
        this.routesResolver = new RoutesResolver_1.RoutesResolver(app);
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
}
exports.BasicRouter = BasicRouter;
