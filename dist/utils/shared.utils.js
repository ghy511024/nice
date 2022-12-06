"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanUrl = exports.isSymbol = exports.isEmpty = exports.isNil = exports.isConstructor = exports.isString = exports.isFunction = exports.validatePath = exports.isObject = exports.isUndefined = void 0;
exports.isUndefined = (obj) => typeof obj === 'undefined';
exports.isObject = (fn) => !exports.isNil(fn) && typeof fn === 'object';
exports.validatePath = (path) => path ? (path.charAt(0) !== '/' ? '/' + path : path) : '';
exports.isFunction = (fn) => typeof fn === 'function';
exports.isString = (fn) => typeof fn === 'string';
exports.isConstructor = (fn) => fn === 'constructor';
exports.isNil = (obj) => exports.isUndefined(obj) || obj === null;
exports.isEmpty = (array) => !(array && array.length > 0);
exports.isSymbol = (fn) => typeof fn === 'symbol';
exports.cleanUrl = (str) => {
    if (typeof str == "string") {
        let result = str;
        result = result.replace(/^\/+/gi, '/');
        if (result[result.length - 1] === '/') {
            result = result.slice(0, result.length - 1);
        }
        return result;
    }
    return str;
};
