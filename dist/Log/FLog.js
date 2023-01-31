"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Flog = void 0;
let _log;
if (typeof console['_log'] != "function") {
    console['_log'] = console.log;
    console['_error'] = console.error;
    let success_color = "\x1B[0;32m";
    let error_color = "\x1B[0;31m";
    let date = new Date();
    let time = `[${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`;
    console.log = (...args) => {
        var msg = success_color + time + success_color;
        console['_log'](msg, ...args);
    };
    console.error = (...args) => {
        var msg = error_color + time + error_color;
        console['_error'](msg, ...args);
    };
}
function isOnline() {
    return process.env['WCloud_Env'] == 'Product';
}
function flog(type, sys, ...args) {
    var myc = "\x1B[0;32m";
    if (type == 'DEBUG') {
        myc = "\x1B[0;33m";
    }
    else if (type == 'ERROR') {
        myc = "\x1B[0;31m";
    }
    let date = new Date();
    let time = `[${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`;
    var msg = myc + time + myc + " " + type + " " + myc + sys;
    console["_log"](msg, '\x1B[0m-', ...args);
}
function logERR(type, sys, ...args) {
    var myc = "\x1B[0;32m";
    if (type == 'DEBUG') {
        myc = "\x1B[0;33m";
    }
    else if (type == 'ERROR') {
        myc = "\x1B[0;31m";
    }
    let date = new Date();
    let time = `[${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`;
    var msg = myc + time + myc + " " + type + " " + myc + sys;
    console.error(msg, '\x1B[0m-', ...args);
}
function getUrls(req) {
    return req.originalUrl || req.url;
}
function getStr(msg, req, res) {
    var array = msg.split(' ');
    var tokenMap = {
        ":url": getUrls(req),
        ":protocol": req.protocol,
        ":hostname": req.hostname,
        ":method": req.method,
        ":status": '| ' + (res.__statusCode || res.statusCode),
        ":response-time": res.responseTime,
        ":date": new Date().toLocaleString(),
        ":referrer": req.headers.referer || req.headers.referrer || '',
        ":remote-addr": req.headers['x-forwarded-for'] || req.ip || req._remoteAddress || (req.socket && (req.socket.remoteAddress || (req.socket.socket && req.socket.socket.remoteAddress))),
        ":user-agent": req.headers['user-agent']
    };
    let retArray = [];
    array.filter((item) => {
        let replaceToken = tokenMap[item];
        if (/^:/.test(item)) {
            retArray.push(replaceToken || '');
        }
        else {
            retArray.push(item);
        }
    });
    return retArray.join(' ');
}
;
class Flog {
    constructor(category) {
        this.isOnline = false;
        this.category = category;
        this.isOnline = isOnline();
    }
    static log(...arg) {
        this.instance.log(...arg);
    }
    static err(...arg) {
        this.instance.err(...arg);
    }
    static debug(...arg) {
        this.instance.debug(...arg);
    }
    static express() {
        let logger = new Flog('SYSTEM');
        return function (req, res, next) {
            const start = +new Date();
            res.on('finish', () => {
                res.responseTime = (+new Date() - start) + "ms";
                let str = ':method :url :status :response-time';
                const logstr = getStr(str, req, res);
                logger.log(logstr);
            });
            return next();
        };
    }
    log(...arg) {
        flog('INFO', this.category, ...arg);
    }
    err(...arg) {
        logERR('ERROR', this.category, ...arg);
    }
    debug(...arg) {
        if (!this.isOnline) {
            flog('DEBUG', this.category, ...arg);
        }
    }
}
exports.Flog = Flog;
Flog.instance = new Flog("SYSTEM");
