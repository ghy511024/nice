"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const shard_utils_1 = require("./utils/shard.utils");
const constants_1 = require("./constants");
function Controller(path) {
    return (target) => {
        Reflect.defineMetadata(constants_1.PATH_METADATA, path, target);
    };
}
function createMethod(method) {
    return (path) => {
        return (target, key, descriptor) => {
            Reflect.defineMetadata(constants_1.PATH_METADATA, path, target, descriptor.value);
            Reflect.defineMetadata(constants_1.METHOD_METADATA, method, target, descriptor.value);
        };
    };
}
const Get = createMethod('get');
const Post = createMethod('post');
const mapRoute = (instance) => {
    const prototype = Object.getPrototypeOf(instance);
    const rootPath = Reflect.getMetadata(constants_1.PATH_METADATA, prototype.constructor);
    const properties = Object.getOwnPropertyNames(prototype).filter(item => !shard_utils_1.isConstructor(item) && shard_utils_1.isFunction(prototype[item]));
    let pathInfo = properties.map(item => {
        const path = Reflect.getMetadata(constants_1.PATH_METADATA, prototype, prototype[item]);
        const method = Reflect.getMetadata(constants_1.METHOD_METADATA, prototype, prototype[item]);
        return { path, method, fn: prototype[item], methodName: item };
    });
    return {
        rootPath,
        pathInfo
    };
};
let r = mapRoute(new Home());
console.log(r);
exports.default = Home;
class Factory {
    use(path, instacne) {
    }
}
