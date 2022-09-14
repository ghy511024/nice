"use strict";
/*!
 * body-parser
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.json = void 0;
var bytes = require('bytes');
var contentType = require('content-type');
var createError = require('http-errors');
const read_1 = require("../read");
var typeis = require('type-is');
var FIRST_CHAR_REGEXP = /^[\x20\x09\x0a\x0d]*([^\x20\x09\x0a\x0d])/;
function json(options) {
    var opts = options || {};
    var limit = typeof opts.limit !== 'number'
        ? bytes.parse(opts.limit || '100kb')
        : opts.limit;
    var inflate = opts.inflate !== false;
    var reviver = opts.reviver;
    var strict = opts.strict !== false;
    var type = opts.type || 'application/json';
    var verify = opts.verify || false;
    if (verify !== false && typeof verify !== 'function') {
        throw new TypeError('option verify must be function');
    }
    var shouldParse = typeof type !== 'function'
        ? typeChecker(type)
        : type;
    function parse(body) {
        if (body.length === 0) {
            return {};
        }
        if (strict) {
            var first = firstchar(body);
            if (first !== '{' && first !== '[') {
                throw createStrictSyntaxError(body, first);
            }
        }
        try {
            return JSON.parse(body, reviver);
        }
        catch (e) {
            throw normalizeJsonSyntaxError(e, {
                message: e.message,
                stack: e.stack
            });
        }
    }
    return function jsonParser(req, res, next) {
        if (req._body) {
            next();
            return;
        }
        req.body = req.body || {};
        if (!typeis.hasBody(req)) {
            next();
            return;
        }
        if (!shouldParse(req)) {
            next();
            return;
        }
        var charset = getCharset(req) || 'utf-8';
        if (charset.slice(0, 4) !== 'utf-') {
            next(createError(415, 'unsupported charset "' + charset.toUpperCase() + '"', {
                charset: charset,
                type: 'charset.unsupported'
            }));
            return;
        }
        read_1.read(req, res, next, parse, {
            encoding: charset,
            inflate: inflate,
            limit: limit,
            verify: verify
        });
    };
}
exports.json = json;
function createStrictSyntaxError(str, char) {
    var index = str.indexOf(char);
    var partial = index !== -1
        ? str.substring(0, index) + '#'
        : '';
    try {
        JSON.parse(partial);
        throw new SyntaxError('strict violation');
    }
    catch (e) {
        return normalizeJsonSyntaxError(e, {
            message: e.message.replace('#', char),
            stack: e.stack
        });
    }
}
function firstchar(str) {
    var match = FIRST_CHAR_REGEXP.exec(str);
    return match
        ? match[1]
        : undefined;
}
function getCharset(req) {
    try {
        return (contentType.parse(req).parameters.charset || '').toLowerCase();
    }
    catch (e) {
        return undefined;
    }
}
function normalizeJsonSyntaxError(error, obj) {
    var keys = Object.getOwnPropertyNames(error);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (key !== 'stack' && key !== 'message') {
            delete error[key];
        }
    }
    error.stack = obj.stack.replace(error.message, obj.message);
    error.message = obj.message;
    return error;
}
function typeChecker(type) {
    return function checkType(req) {
        return Boolean(typeis(req, type));
    };
}
