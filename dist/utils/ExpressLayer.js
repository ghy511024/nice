"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pathRegexp = require('path-to-regexp');
const hasOwnProperty = Object.prototype.hasOwnProperty;
class Layer {
    constructor(path, options) {
        this.pathUrl = path;
        var opts = options || {};
        this.params = undefined;
        this.regexp = pathRegexp(path, this.keys = [], opts);
        this.regexp.fast_star = path === '*';
        this.regexp.fast_slash = path === '/' && opts.end === false;
    }
    match(path) {
        var match;
        if (path != null) {
            if (this.regexp.fast_slash) {
                this.params = {};
                return true;
            }
            if (this.regexp.fast_star) {
                this.params = { '0': this.decode_param(path) };
                return true;
            }
            match = this.regexp.exec(path);
        }
        if (!match) {
            this.params = undefined;
            return false;
        }
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
    }
    getPath() {
        let ret_path = this.pathUrl;
        if (/(\:.*?)\//.test(this.pathUrl)) {
            ret_path = this.pathUrl.replace(/(\:.*?)\//gi, '*/');
        }
        else if (/(\:.*?)$/.test(this.pathUrl)) {
            ret_path = this.pathUrl.replace(/(\:.*?)$/gi, '*');
        }
        return ret_path;
    }
    decode_param(val) {
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
    }
}
exports.Layer = Layer;
