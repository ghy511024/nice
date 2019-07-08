"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
const request_method_enum_1 = require("../../enums/request-method.enum");
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
const createMappingDecorator = (method) => (path) => {
    return exports.RequestMapping({
        [constants_1.PATH_METADATA]: path,
        [constants_1.METHOD_METADATA]: method,
    });
};
exports.Post = createMappingDecorator(request_method_enum_1.RequestMethod.POST);
exports.Get = createMappingDecorator(request_method_enum_1.RequestMethod.GET);
exports.Delete = createMappingDecorator(request_method_enum_1.RequestMethod.DELETE);
exports.Put = createMappingDecorator(request_method_enum_1.RequestMethod.PUT);
exports.Patch = createMappingDecorator(request_method_enum_1.RequestMethod.PATCH);
exports.Options = createMappingDecorator(request_method_enum_1.RequestMethod.OPTIONS);
exports.Head = createMappingDecorator(request_method_enum_1.RequestMethod.HEAD);
exports.All = createMappingDecorator(request_method_enum_1.RequestMethod.ALL);
