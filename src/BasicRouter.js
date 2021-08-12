"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicRouter = void 0;
var RoutesResolver_1 = require("./derector/core/RoutesResolver");
var Config_1 = require("./Config");
var BasicRouter = /** @class */ (function () {
    function BasicRouter(app, config) {
        this.layers = [];
        this.exlayers = [];
        this.config = config || {};
        Config_1.Config.setConfig(config);
        this.app = app;
        this.routesResolver = new RoutesResolver_1.RoutesResolver(app);
    }
    BasicRouter.prototype.use = function () {
        var handlers = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            handlers[_i] = arguments[_i];
        }
        if (handlers.length >= 1) {
            var rootPath = '';
            if (typeof handlers[0] == 'string') {
                rootPath = handlers[0];
                handlers.splice(0, 1);
            }
            for (var i = 0; i < handlers.length; i++) {
                this.routesResolver.registerRouters(handlers[i], rootPath);
            }
        }
    };
    return BasicRouter;
}());
exports.BasicRouter = BasicRouter;
