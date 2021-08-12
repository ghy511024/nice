"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Layer = void 0;
var _a = require("path-to-regexp"), pathToRegexp = _a.pathToRegexp, match = _a.match, parse = _a.parse, compile = _a.compile;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var Layer = /** @class */ (function () {
    function Layer(path, options) {
        this.keys = [];
        this.pathUrl = path;
        var opts = options || {};
        this.wpoint = options['wpoint'];
        this.params = undefined;
        opts.end = !/\/$/.test(path);
        opts.start = true;
        this.regexp = pathToRegexp(path, this.keys, opts);
        // set fast path flags
        this.regexp.fast_star = path === '*';
    }
    Layer.prototype.match = function (path) {
        var match;
        if (path != null) {
            // fast path non-ending match for / (any path matches)
            if (this.regexp.fast_slash) {
                this.params = {};
                return true;
            }
            // fast path for * (everything matched in a param)
            if (this.regexp.fast_star) {
                this.params = { '0': this.decode_param(path) };
                return true;
            }
            // match the path
            match = this.regexp.exec(path);
        }
        if (!match) {
            this.params = undefined;
            return false;
        }
        // store values
        this.params = {};
        var keys = this.keys;
        var params = this.params;
        for (var i = 1; i < match.length; i++) {
            var key = keys[i - 1];
            var prop = key.name;
            var val = this.decode_param(match[i]);
            if (val !== undefined || !(hasOwnProperty.call(params, prop))) {
                params[prop] = val;
            }
        }
        return true;
    };
    Layer.prototype.getPath = function () {
        var ret_path = this.pathUrl;
        if (/(\:.*?)\//.test(this.pathUrl)) {
            ret_path = this.pathUrl.replace(/(\:.*?)\//gi, '*/');
        }
        else if (/(\:.*?)$/.test(this.pathUrl)) {
            ret_path = this.pathUrl.replace(/(\:.*?)$/gi, '*');
        }
        return ret_path;
    };
    Layer.prototype.decode_param = function (val) {
        if (typeof val !== 'string' || val.length === 0) {
            return val;
        }
        try {
            return decodeURIComponent(val);
        }
        catch (err) {
            if (err) {
                err.message = 'Failed to decode param \'' + val + '\'';
                err.status = err.statusCode = 400;
            }
            throw err;
        }
    };
    Layer.prototype.getPoint = function () {
        return this.wpoint;
    };
    return Layer;
}());
exports.Layer = Layer;
