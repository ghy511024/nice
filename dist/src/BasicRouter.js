"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = require("./Config");
class BasicRouter {
    constructor(app, config) {
        this.layers = [];
        this.exlayers = [];
        this.config = config || {};
        Config_1.Config.setConfig(config);
        this.app = app;
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
