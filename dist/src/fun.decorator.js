"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./derector/constants");
const request_method_enum_1 = require("./enums/request-method.enum");
const shared_utils_1 = require("./utils/shared.utils");
require("reflect-metadata");
var Scope;
(function (Scope) {
    Scope[Scope["DEFAULT"] = 0] = "DEFAULT";
    Scope[Scope["TRANSIENT"] = 1] = "TRANSIENT";
    Scope[Scope["REQUEST"] = 2] = "REQUEST";
})(Scope = exports.Scope || (exports.Scope = {}));
const defaultMetadata = {
    [constants_1.PATH_METADATA]: '/',
    [constants_1.METHOD_METADATA]: request_method_enum_1.RequestMethod.GET,
};
exports.RequestMapping = (metadata = defaultMetadata) => {
    const pathMetadata = metadata[constants_1.PATH_METADATA];
    const path = pathMetadata && pathMetadata.length ? pathMetadata : '/';
    const requestMethod = metadata[constants_1.METHOD_METADATA] || request_method_enum_1.RequestMethod.GET;
    return (target, key, descriptor) => {
        Reflect.defineMetadata(constants_1.PATH_METADATA, path, descriptor.value);
        Reflect.defineMetadata(constants_1.METHOD_METADATA, requestMethod, descriptor.value);
        return descriptor;
    };
};
const createMappingDecorator = (method) => {
    return function (path) {
        return exports.RequestMapping({
            [constants_1.PATH_METADATA]: path,
            [constants_1.METHOD_METADATA]: method,
        });
    };
};
const createMidWareDecorator = () => {
    return function (...arg) {
        return (target, key, descriptor) => {
            Reflect.defineMetadata(constants_1.MIDDLEWARE_METADATA, arg, descriptor.value);
            return descriptor;
        };
    };
};
function Controller(prefixOrOptions) {
    const defaultPath = '/';
    const [path, scopeOptions] = shared_utils_1.isUndefined(prefixOrOptions)
        ? [defaultPath, undefined]
        : shared_utils_1.isString(prefixOrOptions)
            ? [prefixOrOptions, undefined]
            : [prefixOrOptions.path || defaultPath, { scope: prefixOrOptions.scope }];
    return (target) => {
        Reflect.defineMetadata(constants_1.PATH_METADATA, path, target);
    };
}
exports.Controller = Controller;
exports.Post = createMappingDecorator(request_method_enum_1.RequestMethod.POST);
exports.Get = createMappingDecorator(request_method_enum_1.RequestMethod.GET);
exports.Delete = createMappingDecorator(request_method_enum_1.RequestMethod.DELETE);
exports.Put = createMappingDecorator(request_method_enum_1.RequestMethod.PUT);
exports.Patch = createMappingDecorator(request_method_enum_1.RequestMethod.PATCH);
exports.Options = createMappingDecorator(request_method_enum_1.RequestMethod.OPTIONS);
exports.Head = createMappingDecorator(request_method_enum_1.RequestMethod.HEAD);
exports.All = createMappingDecorator(request_method_enum_1.RequestMethod.ALL);
exports.Mid = createMidWareDecorator();
function Filter(...arg) {
    return (target) => {
        Reflect.defineMetadata(constants_1.FILTER_METADATA, arg, target);
    };
}
exports.Filter = Filter;
