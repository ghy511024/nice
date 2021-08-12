"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.WMonitor = exports.KRouter = exports.Router = void 0;
var pathRegexp = require('path-to-regexp');
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
var Layer_1 = require("./utils/Layer");
var WFManager = require("wfmanager");
var BasicRouter_1 = require("./BasicRouter");
var flog = require('@fang/flog').getLog('fang-router/Router');
var WM = require('wmonitor');
var Router = /** @class */ (function (_super) {
    __extends(Router, _super);
    function Router(app, config) {
        var _a;
        var _this = _super.call(this, app, config) || this;
        if (((_a = config === null || config === void 0 ? void 0 : config.wf) === null || _a === void 0 ? void 0 : _a.open) === true) {
            _this.initWF();
        }
        _this.initWmonitor();
        return _this;
    }
    // 加载wfmanager 插件
    Router.prototype.initWF = function () {
        var _this = this;
        this.app.use(WFManager.express());
        setTimeout(function () {
            var option = { urls: _this.routesResolver.getAllPaths() };
            if (_this.config && _this.config.wf) {
                option = Object.assign(option, _this.config.wf);
            }
            option['debug'] = !!_this.config.debug;
            WFManager.init(option);
        }, 100);
    };
    // 加载wmonitor 插件
    Router.prototype.initWmonitor = function () {
        var _this = this;
        var _a, _b, _c;
        if (((_a = this.config.wmonitor) === null || _a === void 0 ? void 0 : _a.include) && typeof ((_b = this.config.wmonitor) === null || _b === void 0 ? void 0 : _b.include) == 'object') {
            for (var key in this.config.wmonitor.include) {
                var layer = new Layer_1.Layer(key, { wpoint: this.config.wmonitor.include[key] });
                this.layers.push(layer);
            }
            if ((_c = this.config.wmonitor) === null || _c === void 0 ? void 0 : _c.exclude) {
                for (var _i = 0, _d = this.config.wmonitor.exclude; _i < _d.length; _i++) {
                    var key = _d[_i];
                    var layer = new Layer_1.Layer(key, { wpoint: this.config.wmonitor.include[key] });
                    this.exlayers.push(layer);
                }
            }
            this.app.use(function (req, res, next) {
                for (var i = 0; i < _this.layers.length; i++) {
                    if (_this.layers[i].match(req.url)) {
                        var isExculde = false;
                        for (var j = 0; j < _this.exlayers.length; j++) {
                            if (_this.exlayers[j].match(req.url)) {
                                isExculde = true;
                            }
                        }
                        if (!isExculde) {
                            if (!!_this.config.debug) {
                                flog.debug('wmonitor success', "reg:", _this.layers[i].getPath(), 'url:', req.url, _this.layers[i].getPoint());
                            }
                            WM.sum(_this.layers[i].getPoint(), 1);
                        }
                        else {
                            if (!!_this.config.debug) {
                                flog.debug('wmonitor success but exclude', "reg:", _this.layers[i].getPath(), 'url:', req.url);
                            }
                        }
                        break;
                    }
                }
                next();
            });
        }
    };
    return Router;
}(BasicRouter_1.BasicRouter));
exports.Router = Router;
var KRouter = /** @class */ (function (_super) {
    __extends(KRouter, _super);
    function KRouter(app, config) {
        return _super.call(this, app, config) || this;
    }
    return KRouter;
}(BasicRouter_1.BasicRouter));
exports.KRouter = KRouter;
var WMonitor = /** @class */ (function () {
    function WMonitor() {
    }
    WMonitor.sum = function (value, count) {
        WM.sum(value, count);
    };
    WMonitor.average = function (value, count) {
        WM.average(value, count);
    };
    WMonitor.max = function (value, count) {
        WM.max(value, count);
    };
    WMonitor.min = function (value, count) {
        WM.min(value, count);
    };
    return WMonitor;
}());
exports.WMonitor = WMonitor;
