"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanUrl = exports.isSymbol = exports.isEmpty = exports.isNil = exports.isConstructor = exports.isString = exports.isFunction = exports.validatePath = exports.isObject = exports.isUndefined = void 0;
const isUndefined = (obj) => typeof obj === 'undefined';
exports.isUndefined = isUndefined;
const isObject = (fn) => !(0, exports.isNil)(fn) && typeof fn === 'object';
exports.isObject = isObject;
const validatePath = (path) => path ? (path.charAt(0) !== '/' ? '/' + path : path) : '';
exports.validatePath = validatePath;
const isFunction = (fn) => typeof fn === 'function';
exports.isFunction = isFunction;
const isString = (fn) => typeof fn === 'string';
exports.isString = isString;
const isConstructor = (fn) => fn === 'constructor';
exports.isConstructor = isConstructor;
const isNil = (obj) => (0, exports.isUndefined)(obj) || obj === null;
exports.isNil = isNil;
const isEmpty = (array) => !(array && array.length > 0);
exports.isEmpty = isEmpty;
const isSymbol = (fn) => typeof fn === 'symbol';
exports.isSymbol = isSymbol;
const cleanUrl = (str) => {
    let result = str;
    result = result.replace(/^\/+/gi, '/');
    if (result[result.length - 1] === '/') {
        result = result.slice(0, result.length - 1);
    }
    return result;
};
exports.cleanUrl = cleanUrl;
