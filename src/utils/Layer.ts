const {pathToRegexp, match, parse, compile} = require("path-to-regexp");

const hasOwnProperty = Object.prototype.hasOwnProperty;


export class Layer {
    private params: any;
    private pathUrl: string;
    private regexp: any;
    private keys: any[] = [];
    private wpoint: number

    constructor(path, options) {
        this.pathUrl = path;
        var opts = options || {};
        this.wpoint = options['wpoint']
        this.params = undefined;
        opts.end = !/\/$/.test(path)
        opts.start = true;
        this.regexp = pathToRegexp(path, this.keys, opts);
        // set fast path flags
        this.regexp.fast_star = path === '*'
    }

    public match(path) {
        var match

        if (path != null) {

            // fast path non-ending match for / (any path matches)
            if (this.regexp.fast_slash) {
                this.params = {}
                return true
            }

            // fast path for * (everything matched in a param)
            if (this.regexp.fast_star) {
                this.params = {'0': this.decode_param(path)}
                return true
            }

            // match the path
            match = this.regexp.exec(path)
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
            var val = this.decode_param(match[i])

            if (val !== undefined || !(hasOwnProperty.call(params, prop))) {
                params[prop] = val;
            }
        }

        return true;
    }

    public getPath() {
        let ret_path = this.pathUrl;
        if (/(\:.*?)\//.test(this.pathUrl)) {
            ret_path = this.pathUrl.replace(/(\:.*?)\//gi, '*/')
        } else if (/(\:.*?)$/.test(this.pathUrl)) {
            ret_path = this.pathUrl.replace(/(\:.*?)$/gi, '*')
        }
        return ret_path;
    }

    private decode_param(val) {
        if (typeof val !== 'string' || val.length === 0) {
            return val;
        }

        try {
            return decodeURIComponent(val);
        } catch (err) {
            if (err) {
                err.message = 'Failed to decode param \'' + val + '\'';
                err.status = err.statusCode = 400;
            }
            throw err;
        }
    }

    getPoint() {
        return this.wpoint;
    }

}
