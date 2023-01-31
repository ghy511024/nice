"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterExplorer = void 0;
require("reflect-metadata");
const constants_1 = require("../constants");
const router_proxy_1 = require("./router-proxy");
const shared_utils_1 = require("../../utils/shared.utils");
const router_method_factory_1 = require("./router-method-factory");
class RouterExplorer {
    constructor(metadataScanner, applicationRef) {
        this.metadataScanner = metadataScanner;
        this.routerMethodFactory = new router_method_factory_1.RouterMethodFactory();
        this.exceptionFiltersCache = new WeakMap();
        this.allPaths = [];
        this.routerProxy = new router_proxy_1.RouterProxy();
        this.applicationRef = applicationRef;
    }
    getAllpaths() {
        return this.allPaths;
    }
    explore(instance, basePath, root_filter) {
        const routerPaths = this.scanForPaths(instance);
        this.applyPathsToRouterProxy(routerPaths, basePath, root_filter);
    }
    logger(...arg) {
        console.log(...arg);
    }
    applyPathsToRouterProxy(routePaths, basePath, root_filter) {
        let pathArray = [];
        (routePaths || []).forEach(pathProperties => {
            const { path, requestMethod } = pathProperties;
            this.applyCallbackToRouter(pathProperties, basePath, root_filter);
        });
    }
    applyCallbackToRouter(pathProperties, basePath, root_filter) {
        const { path: paths, requestMethod, targetCallback, methodName, midware } = pathProperties;
        const routerMethod = this.routerMethodFactory.get(this.applicationRef, requestMethod).bind(this.applicationRef);
        let all_filter = [];
        if (root_filter) {
            all_filter = all_filter.concat(root_filter);
        }
        if (midware) {
            all_filter = all_filter.concat(midware);
        }
        const proxy = this.createCallbackProxy(targetCallback);
        paths.forEach(path => {
            let fullPath = (0, shared_utils_1.cleanUrl)(basePath) + path;
            if (path instanceof RegExp) {
                let reg_basePath = basePath.replace("/", "\/");
                let reg_path = path.source;
                if (!/\/$/.test(reg_basePath)) {
                    reg_basePath = reg_basePath + '/';
                }
                let reg_fullPath = reg_basePath + reg_path;
                fullPath = new RegExp(reg_fullPath);
            }
            this.allPaths.push((0, shared_utils_1.cleanUrl)(fullPath) || '/');
            if (all_filter.length > 0) {
                let tmpArray = [];
                tmpArray.push((0, shared_utils_1.cleanUrl)(fullPath) || '/');
                tmpArray = tmpArray.concat(all_filter);
                tmpArray.push(proxy);
                routerMethod.apply(this, tmpArray);
            }
            else {
                routerMethod((0, shared_utils_1.cleanUrl)(fullPath) || '/', proxy);
            }
        });
    }
    extractRouterPath(metatype, prefix) {
        let path = Reflect.getMetadata(constants_1.PATH_METADATA, metatype);
        if (prefix)
            path = prefix + this.validateRoutePath(path);
        return this.validateRoutePath(path);
    }
    validateRoutePath(path) {
        if ((0, shared_utils_1.isUndefined)(path)) {
            throw new Error('UnknownRequestMappingException');
        }
        if (typeof path == "string") {
            return (0, shared_utils_1.validatePath)(path);
        }
        else {
            return path;
        }
    }
    scanForPaths(instance, prototype) {
        const instancePrototype = (0, shared_utils_1.isUndefined)(prototype) ? Object.getPrototypeOf(instance) : prototype;
        return this.metadataScanner.scanFromPrototype(instance, instancePrototype, method => {
            return this.exploreMethodMetadata(instance, instancePrototype, method);
        });
    }
    exploreMethodMetadata(instance, instancePrototype, methodName) {
        const targetCallback = instancePrototype[methodName];
        const routePath = Reflect.getMetadata(constants_1.PATH_METADATA, targetCallback);
        const midware = Reflect.getMetadata(constants_1.MIDDLEWARE_METADATA, targetCallback);
        if ((0, shared_utils_1.isUndefined)(routePath)) {
            return null;
        }
        const requestMethod = Reflect.getMetadata(constants_1.METHOD_METADATA, targetCallback);
        let path;
        if (routePath instanceof Array) {
            path = routePath.map(p => this.validateRoutePath(p));
        }
        else {
            path = [this.validateRoutePath(routePath)];
        }
        return {
            path,
            requestMethod,
            targetCallback,
            midware,
            methodName,
        };
    }
    createCallbackProxy(callback) {
        return this.routerProxy.createProxy(callback);
    }
}
exports.RouterExplorer = RouterExplorer;
