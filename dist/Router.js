"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Flog = exports.WMonitor = exports.KRouter = exports.Router = void 0;
const pathRegexp = require('path-to-regexp');
var fun_decorator_1 = require("./fun.decorator");
Object.defineProperty(exports, "Controller", { enumerable: true, get: function () { return fun_decorator_1.Controller; } });
Object.defineProperty(exports, "Get", { enumerable: true, get: function () { return fun_decorator_1.Get; } });
Object.defineProperty(exports, "Post", { enumerable: true, get: function () { return fun_decorator_1.Post; } });
Object.defineProperty(exports, "Delete", { enumerable: true, get: function () { return fun_decorator_1.Delete; } });
Object.defineProperty(exports, "Put", { enumerable: true, get: function () { return fun_decorator_1.Put; } });
Object.defineProperty(exports, "Patch", { enumerable: true, get: function () { return fun_decorator_1.Patch; } });
Object.defineProperty(exports, "Options", { enumerable: true, get: function () { return fun_decorator_1.Options; } });
Object.defineProperty(exports, "Head", { enumerable: true, get: function () { return fun_decorator_1.Head; } });
Object.defineProperty(exports, "All", { enumerable: true, get: function () { return fun_decorator_1.All; } });
Object.defineProperty(exports, "Filter", { enumerable: true, get: function () { return fun_decorator_1.Filter; } });
Object.defineProperty(exports, "Mid", { enumerable: true, get: function () { return fun_decorator_1.Mid; } });
const Layer_1 = require("./utils/Layer");
const WFManager = require("wfmanager");
const BasicRouter_1 = require("./BasicRouter");
const FLog_1 = require("./Log/FLog");
Object.defineProperty(exports, "Flog", { enumerable: true, get: function () { return FLog_1.Flog; } });
const XSS_1 = require("./utils/XSS");
const flog = new FLog_1.Flog('fang-router/Router');
const WM = require('@wb/wmonitor');
class Router extends BasicRouter_1.BasicRouter {
    constructor(app, config) {
        var _a;
        super(app, config);
        if (config === null || config === void 0 ? void 0 : config.xssFix) {
            this.initXSSFix();
        }
        if (((_a = config === null || config === void 0 ? void 0 : config.wf) === null || _a === void 0 ? void 0 : _a.open) === true) {
            this.initWF();
        }
        if (config.wmonitor) {
            this.initWMonitor();
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
    initWMonitor() {
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
    initXSSFix() {
        this.app.use((req, res, next) => {
            XSS_1.XSSFix.fixXss(req);
            next();
        });
    }
}
exports.Router = Router;
class KRouter extends BasicRouter_1.BasicRouter {
    constructor(app, config) {
        super(app, config);
    }
}
exports.KRouter = KRouter;
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
