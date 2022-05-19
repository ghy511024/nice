'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.read = void 0;
var createError = require('http-errors');
var destroy = require('destroy');
var getBody = require('raw-body');
var iconv = require('iconv-lite');
var onFinished = require('on-finished');
var unpipe = require('unpipe');
var zlib = require('zlib');
function read(req, res, next, parse, options) {
    var length;
    var opts = options;
    var stream;
    req._body = true;
    var encoding = opts.encoding !== null
        ? opts.encoding
        : null;
    var verify = opts.verify;
    try {
        stream = contentstream(req, opts.inflate);
        length = stream.length;
        stream.length = undefined;
    }
    catch (err) {
        return next(err);
    }
    opts.length = length;
    opts.encoding = verify
        ? null
        : encoding;
    if (opts.encoding === null && encoding !== null && !iconv.encodingExists(encoding)) {
        return next(createError(415, 'unsupported charset "' + encoding.toUpperCase() + '"', {
            charset: encoding.toLowerCase(),
            type: 'charset.unsupported'
        }));
    }
    getBody(stream, opts, function (error, body) {
        if (error) {
            var _error;
            if (error.type === 'encoding.unsupported') {
                _error = createError(415, 'unsupported charset "' + encoding.toUpperCase() + '"', {
                    charset: encoding.toLowerCase(),
                    type: 'charset.unsupported'
                });
            }
            else {
                _error = createError(400, error);
            }
            if (stream !== req) {
                unpipe(req);
                destroy(stream, true);
            }
            dump(req, function onfinished() {
                next(createError(400, _error));
            });
            return;
        }
        if (verify) {
            try {
                verify(req, res, body, encoding);
            }
            catch (err) {
                next(createError(403, err, {
                    body: body,
                    type: err.type || 'entity.verify.failed'
                }));
                return;
            }
        }
        var str = body;
        try {
            str = typeof body !== 'string' && encoding !== null
                ? iconv.decode(body, encoding)
                : body;
            req.body = parse(str);
        }
        catch (err) {
            next(createError(400, err, {
                body: str,
                type: err.type || 'entity.parse.failed'
            }));
            return;
        }
        next();
    });
}
exports.read = read;
function contentstream(req, inflate) {
    var encoding = (req.headers['content-encoding'] || 'identity').toLowerCase();
    var length = req.headers['content-length'];
    var stream;
    if (inflate === false && encoding !== 'identity') {
        throw createError(415, 'content encoding unsupported', {
            encoding: encoding,
            type: 'encoding.unsupported'
        });
    }
    switch (encoding) {
        case 'deflate':
            stream = zlib.createInflate();
            req.pipe(stream);
            break;
        case 'gzip':
            stream = zlib.createGunzip();
            req.pipe(stream);
            break;
        case 'identity':
            stream = req;
            stream.length = length;
            break;
        default:
            throw createError(415, 'unsupported content encoding "' + encoding + '"', {
                encoding: encoding,
                type: 'encoding.unsupported'
            });
    }
    return stream;
}
function dump(req, callback) {
    if (onFinished.isFinished(req)) {
        callback(null);
    }
    else {
        onFinished(req, callback);
        req.resume();
    }
}
