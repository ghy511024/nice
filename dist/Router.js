"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RoutesResolver_1 = require("./derector/core/RoutesResolver");
const Config_1 = require("./Config");
const pathRegexp = require('path-to-regexp');
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
const Layer_1 = require("./utils/Layer");
const WFManager = require("wfmanager");
const flog = require('@fang/flog').getLog('fang-router/Router');
const WM = require('wmonitor');
class Router {
    constructor(app, config) {
        this.layers = [];
        this.exlayers = [];
        this.routesResolver = new RoutesResolver_1.RoutesResolver(app);
        this.config = config || {};
        Config_1.Config.setConfig(config);
        this.app = app;
        this.initWF();
        this.initWmonitor();
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
            option['debug'] = !!this.config.debug;
            WFManager.init(option);
        }, 100);
    }
    initWmonitor() {
        var _a, _b, _c;
        if (((_a = this.config.wmonitor) === null || _a === void 0 ? void 0 : _a.include) && typeof ((_b = this.config.wmonitor) === null || _b === void 0 ? void 0 : _b.include) == 'object') {
            for (let key in this.config.wmonitor.include) {
                let layer = new Layer_1.Layer(key, { wpoint: this.config.wmonitor.include[key] });
                this.layers.push(layer);
            }
            if ((_c = this.config.wmonitor) === null || _c === void 0 ? void 0 : _c.exclude) {
                for (let key of this.config.wmonitor.exclude) {
                    let layer = new Layer_1.Layer(key, { wpoint: this.config.wmonitor.include[key] });
                    this.exlayers.push(layer);
                }
            }
            this.app.use((req, res, next) => {
                for (let i = 0; i < this.layers.length; i++) {
                    if (this.layers[i].match(req.url)) {
                        let isExculde = false;
                        for (let j = 0; j < this.exlayers.length; j++) {
                            if (this.exlayers[j].match(req.url)) {
                                isExculde = true;
                            }
                        }
                        if (!isExculde) {
                            if (!!this.config.debug) {
                                flog.debug('wmonitor success', "reg:", this.layers[i].getPath(), 'url:', req.url, this.layers[i].getPoint());
                            }
                            WM.sum(this.layers[i].getPoint(), 1);
                        }
                        else {
                            if (!!this.config.debug) {
                                flog.debug('wmonitor success but exclude', "reg:", this.layers[i].getPath(), 'url:', req.url);
                            }
                        }
                        break;
                    }
                }
                next();
            });
        }
    }
}
exports.Router = Router;
class WMonitor {
    static sum(value, count) {
        WM.sum(value, count);
    }
    static average(value, count) {
        WM.average(value, count);
    }
    static max(value, count) {
        WM.max(value, count);
    }
    static min(value, count) {
        WM.min(value, count);
    }
}
exports.WMonitor = WMonitor;
