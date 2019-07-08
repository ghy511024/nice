"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const constants_1 = require("../../constants");
const shared_utils_1 = require("../../utils/shared.utils");
const router_method_factory_1 = require("./router-method-factory");
class RouterExplorer {
    constructor(metadataScanner, applicationRef) {
        this.metadataScanner = metadataScanner;
        this.routerMethodFactory = new router_method_factory_1.RouterMethodFactory();
        this.exceptionFiltersCache = new WeakMap();
        this.applicationRef = applicationRef;
    }
    explore(instance, basePath) {
        const routerPaths = this.scanForPaths(instance);
        this.applyPathsToRouterProxy(routerPaths, basePath);
    }
    logger(...arg) {
        console.log(...arg);
    }
    applyPathsToRouterProxy(routePaths, basePath) {
        (routePaths || []).forEach(pathProperties => {
            const { path, requestMethod } = pathProperties;
            this.applyCallbackToRouter(pathProperties, basePath);
            path.forEach(p => {
                this.logger('hahah:', p, requestMethod, requestMethod);
            });
        });
    }
    applyCallbackToRouter(pathProperties, basePath) {
        const { path: paths, requestMethod, targetCallback, methodName, } = pathProperties;
        const routerMethod = this.routerMethodFactory.get(this.applicationRef, requestMethod).bind(this.applicationRef);
        const stripSlash = (str) => str[str.length - 1] === '/' ? str.slice(0, str.length - 1) : str;
        const proxy = this.createCallbackProxy(targetCallback);
        paths.forEach(path => {
            const fullPath = stripSlash(basePath) + path;
            console.log('full path', stripSlash(fullPath));
            routerMethod(stripSlash(fullPath) || '/', proxy);
        });
    }
    extractRouterPath(metatype, prefix) {
        console.log(JSON.stringify(metatype));
        let path = Reflect.getMetadata(constants_1.PATH_METADATA, metatype);
        console.log('path2', path);
        if (prefix)
            path = prefix + this.validateRoutePath(path);
        return this.validateRoutePath(path);
    }
    validateRoutePath(path) {
        if (shared_utils_1.isUndefined(path)) {
            throw new Error('UnknownRequestMappingException');
        }
        return shared_utils_1.validatePath(path);
    }
    scanForPaths(instance, prototype) {
        const instancePrototype = shared_utils_1.isUndefined(prototype) ? Object.getPrototypeOf(instance) : prototype;
        return this.metadataScanner.scanFromPrototype(instance, instancePrototype, method => {
            return this.exploreMethodMetadata(instance, instancePrototype, method);
        });
    }
    exploreMethodMetadata(instance, instancePrototype, methodName) {
        const targetCallback = instancePrototype[methodName];
        const routePath = Reflect.getMetadata(constants_1.PATH_METADATA, targetCallback);
        if (shared_utils_1.isUndefined(routePath)) {
            return null;
        }
        const requestMethod = Reflect.getMetadata(constants_1.METHOD_METADATA, targetCallback);
        const path = shared_utils_1.isString(routePath)
            ? [this.validateRoutePath(routePath)]
            : routePath.map(p => this.validateRoutePath(p));
        return {
            path,
            requestMethod,
            targetCallback,
            methodName,
        };
    }
    createCallbackProxy(callback) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            yield callback(req, res, next);
        });
    }
}
exports.RouterExplorer = RouterExplorer;
