"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Filter = exports.Mid = exports.All = exports.Head = exports.Options = exports.Patch = exports.Put = exports.Delete = exports.Get = exports.Post = exports.Controller = exports.RequestMapping = exports.Scope = void 0;
var constants_1 = require("./derector/constants");
var request_method_enum_1 = require("./enums/request-method.enum");
var shared_utils_1 = require("./utils/shared.utils");
require("reflect-metadata");
var Scope;
(function (Scope) {
    Scope[Scope["DEFAULT"] = 0] = "DEFAULT";
    Scope[Scope["TRANSIENT"] = 1] = "TRANSIENT";
    Scope[Scope["REQUEST"] = 2] = "REQUEST";
})(Scope = exports.Scope || (exports.Scope = {}));
var defaultMetadata = (_a = {},
    _a[constants_1.PATH_METADATA] = '/',
    _a[constants_1.METHOD_METADATA] = request_method_enum_1.RequestMethod.GET,
    _a);
exports.RequestMapping = function (metadata) {
    if (metadata === void 0) { metadata = defaultMetadata; }
    var pathMetadata = metadata[constants_1.PATH_METADATA];
    var path = pathMetadata && pathMetadata.length ? pathMetadata : '/';
    var requestMethod = metadata[constants_1.METHOD_METADATA] || request_method_enum_1.RequestMethod.GET;
    return function (target, key, descriptor) {
        Reflect.defineMetadata(constants_1.PATH_METADATA, path, descriptor.value);
        Reflect.defineMetadata(constants_1.METHOD_METADATA, requestMethod, descriptor.value);
        return descriptor;
    };
};
var createMappingDecorator = function (method) {
    return function (path) {
        var _a;
        return exports.RequestMapping((_a = {},
            _a[constants_1.PATH_METADATA] = path,
            _a[constants_1.METHOD_METADATA] = method,
            _a));
    };
};
var createMidWareDecorator = function () {
    return function (arg) {
        return function (target, key, descriptor) {
            var midwareArray = Reflect.getMetadata(constants_1.MIDDLEWARE_METADATA, target);
            if (midwareArray && midwareArray instanceof Array && midwareArray.length > 0) {
                var _arg = void 0;
                if (typeof arg == 'function') {
                    _arg = [arg];
                }
                else if (arg instanceof Array) {
                    _arg = arg;
                }
                if (_arg) {
                    midwareArray = midwareArray.concat(_arg);
                }
            }
            else if (typeof arg == 'function') {
                midwareArray = [arg];
            }
            else if (arg instanceof Array) {
                midwareArray = arg;
            }
            Reflect.defineMetadata(constants_1.MIDDLEWARE_METADATA, midwareArray, descriptor.value);
            return descriptor;
        };
    };
};
function Controller(prefixOrOptions) {
    var defaultPath = '/';
    var _a = shared_utils_1.isUndefined(prefixOrOptions)
        ? [defaultPath, undefined]
        : shared_utils_1.isString(prefixOrOptions)
            ? [prefixOrOptions, undefined]
            : [prefixOrOptions.path || defaultPath, { scope: prefixOrOptions.scope }], path = _a[0], scopeOptions = _a[1];
    return function (target) {
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
function Filter(arg) {
    return function (target) {
        if (typeof arg == 'function') {
            arg = [arg];
        }
        Reflect.defineMetadata(constants_1.FILTER_METADATA, arg, target);
    };
}
exports.Filter = Filter;
