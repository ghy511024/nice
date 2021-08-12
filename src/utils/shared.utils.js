"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanUrl = exports.isSymbol = exports.isEmpty = exports.isNil = exports.isConstructor = exports.isString = exports.isFunction = exports.validatePath = exports.isObject = exports.isUndefined = void 0;
exports.isUndefined = function (obj) { return typeof obj === 'undefined'; };
exports.isObject = function (fn) { return !exports.isNil(fn) && typeof fn === 'object'; };
exports.validatePath = function (path) { return path ? (path.charAt(0) !== '/' ? '/' + path : path) : ''; };
exports.isFunction = function (fn) { return typeof fn === 'function'; };
exports.isString = function (fn) { return typeof fn === 'string'; };
exports.isConstructor = function (fn) { return fn === 'constructor'; };
exports.isNil = function (obj) { return exports.isUndefined(obj) || obj === null; };
exports.isEmpty = function (array) { return !(array && array.length > 0); };
exports.isSymbol = function (fn) { return typeof fn === 'symbol'; };
exports.cleanUrl = function (str) {
    var result = str;
    result = result.replace(/^\/+/gi, '/');
    if (result[result.length - 1] === '/') {
        result = result.slice(0, result.length - 1);
    }
    return result;
};
