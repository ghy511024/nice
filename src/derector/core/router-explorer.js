"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterExplorer = void 0;
require("reflect-metadata");
var constants_1 = require("../constants");
var router_proxy_1 = require("./router-proxy");
var shared_utils_1 = require("../../utils/shared.utils");
var router_method_factory_1 = require("./router-method-factory");
var RouterExplorer = /** @class */ (function () {
    function RouterExplorer(metadataScanner, applicationRef) {
        this.metadataScanner = metadataScanner;
        this.routerMethodFactory = new router_method_factory_1.RouterMethodFactory();
        this.exceptionFiltersCache = new WeakMap();
        this.allPaths = [];
        this.routerProxy = new router_proxy_1.RouterProxy();
        this.applicationRef = applicationRef;
    }
    RouterExplorer.prototype.getAllpaths = function () {
        return this.allPaths;
    };
    RouterExplorer.prototype.explore = function (instance, basePath, root_filter) {
        var routerPaths = this.scanForPaths(instance);
        this.applyPathsToRouterProxy(routerPaths, basePath, root_filter);
    };
    RouterExplorer.prototype.logger = function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        console.log.apply(console, arg);
    };
    RouterExplorer.prototype.applyPathsToRouterProxy = function (routePaths, basePath, root_filter) {
        var _this = this;
        var pathArray = [];
        (routePaths || []).forEach(function (pathProperties) {
            var path = pathProperties.path, requestMethod = pathProperties.requestMethod;
            _this.applyCallbackToRouter(pathProperties, basePath, root_filter);
        });
    };
    RouterExplorer.prototype.applyCallbackToRouter = function (pathProperties, basePath, root_filter) {
        var _this = this;
        var paths = pathProperties.path, requestMethod = pathProperties.requestMethod, targetCallback = pathProperties.targetCallback, methodName = pathProperties.methodName, midware = pathProperties.midware;
        var routerMethod = this.routerMethodFactory.get(this.applicationRef, requestMethod).bind(this.applicationRef);
        var all_filter = [];
        if (root_filter) {
            all_filter = all_filter.concat(root_filter);
        }
        if (midware) {
            all_filter = all_filter.concat(midware);
        }
        var proxy = this.createCallbackProxy(targetCallback);
        paths.forEach(function (path) {
            var fullPath = shared_utils_1.cleanUrl(basePath) + path;
            _this.allPaths.push(shared_utils_1.cleanUrl(fullPath) || '/');
            if (all_filter.length > 0) {
                var tmpArray = [];
                tmpArray.push(shared_utils_1.cleanUrl(fullPath) || '/');
                tmpArray = tmpArray.concat(all_filter);
                tmpArray.push(proxy);
                routerMethod.apply(_this, tmpArray);
                // routerMethod(cleanUrl(fullPath) || '/', all_filter[0], proxy);
            }
            else {
                routerMethod(shared_utils_1.cleanUrl(fullPath) || '/', proxy);
            }
        });
    };
    RouterExplorer.prototype.extractRouterPath = function (metatype, prefix) {
        var path = Reflect.getMetadata(constants_1.PATH_METADATA, metatype);
        if (prefix)
            path = prefix + this.validateRoutePath(path);
        return this.validateRoutePath(path);
    };
    RouterExplorer.prototype.validateRoutePath = function (path) {
        if (shared_utils_1.isUndefined(path)) {
            // throw new UnknownRequestMappingException();
            throw new Error('UnknownRequestMappingException');
        }
        return shared_utils_1.validatePath(path);
    };
    RouterExplorer.prototype.scanForPaths = function (instance, prototype) {
        var _this = this;
        var instancePrototype = shared_utils_1.isUndefined(prototype) ? Object.getPrototypeOf(instance) : prototype;
        return this.metadataScanner.scanFromPrototype(instance, instancePrototype, function (method) {
            return _this.exploreMethodMetadata(instance, instancePrototype, method);
        });
    };
    RouterExplorer.prototype.exploreMethodMetadata = function (instance, // 实例
    instancePrototype, // 实例的prototype
    methodName) {
        var _this = this;
        var targetCallback = instancePrototype[methodName];
        var routePath = Reflect.getMetadata(constants_1.PATH_METADATA, targetCallback);
        // 中间件
        var midware = Reflect.getMetadata(constants_1.MIDDLEWARE_METADATA, targetCallback);
        if (shared_utils_1.isUndefined(routePath)) {
            return null;
        }
        var requestMethod = Reflect.getMetadata(constants_1.METHOD_METADATA, targetCallback);
        var path = shared_utils_1.isString(routePath)
            ? [this.validateRoutePath(routePath)]
            : routePath.map(function (p) { return _this.validateRoutePath(p); });
        return {
            path: path,
            requestMethod: requestMethod,
            targetCallback: targetCallback,
            midware: midware,
            methodName: methodName,
        };
    };
    RouterExplorer.prototype.createCallbackProxy = function (callback) {
        return this.routerProxy.createProxy(callback);
    };
    return RouterExplorer;
}());
exports.RouterExplorer = RouterExplorer;
