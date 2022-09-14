/**
 *
 * 字色编号：30黑，31红，32绿，33黄，34蓝，35紫，36深绿，37白色
 * 背景编号：40黑，41红，42绿，43黄，44蓝，45紫，46深绿，47白色
 *console.log('\033[42;30m DONE \033[40;32m Compiled successfully in 19987ms\033[0m')
 * */

// import {configure, Logger, getLogger} from 'log4js';

// configure({
//     appenders: {
//         out: {type: 'console'}
//     },
//     categories: {
//         default: {appenders: ['out'], level: 'debug'}
//     },
//     pm2: true,
//     pm2InstanceVar: 'INSTANCE_ID'
// })


function isOnline() {
    return process.env['WCloud_Env'] == 'Product'
}


function flog(type, sys, ...args) {
    var myc = "\x1B[0;32m"
    if (type == 'DEBUG') {
        myc = "\x1B[0;33m"
    } else if (type == 'ERROR') {
        myc = "\x1B[0;31m"
    }
    let date = new Date();
    let time=`[${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`
    var msg = myc + time + myc + " " + type + " " + myc + sys
    console.log(msg, '\x1B[0m-', ...args)
}

function logERR(type, sys, ...args) {
    var myc = "\x1B[0;32m"
    if (type == 'DEBUG') {
        myc = "\x1B[0;33m"
    } else if (type == 'ERROR') {
        myc = "\x1B[0;31m"
    }
    let date = new Date();
    let time=`[${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`
    var msg = myc + time + myc + " " + type + " " + myc + sys
    console.error(msg, '\x1B[0m-', ...args)
}

function getUrls(req) {
    return req.originalUrl || req.url;
}

function getStr(msg, req, res) {
    var array = msg.split(' ')
    var tokenMap = {
        ":url": getUrls(req),
        ":protocol": req.protocol,
        ":hostname": req.hostname,
        ":method": req.method,
        ":status": res.__statusCode || res.statusCode,
        ":response-time": res.responseTime,
        ":date": new Date().toLocaleString(),
        ":referrer": req.headers.referer || req.headers.referrer || '',
        ":remote-addr": req.headers['x-forwarded-for'] || req.ip || req._remoteAddress || (req.socket && (req.socket.remoteAddress || (req.socket.socket && req.socket.socket.remoteAddress))),
        ":user-agent": req.headers['user-agent']
    }
    let retArray = []
    array.filter((item) => {
        let replaceToken = tokenMap[item]
        if (/^:/.test(item)) {
            retArray.push(replaceToken || '')
        } else {
            retArray.push(item)
        }
    });
    return retArray.join(' ');
};


export class Flog {
    private category: string;
    private isOnline: boolean = false;
    private static instance: Flog = new Flog("SYSTEM");


    static log(...arg) {
        this.instance.log(...arg)
    }

    static err(...arg) {
        this.instance.err(...arg)
    }

    static debug(...arg) {
        this.instance.debug(...arg)
    }

    static express() {
        let logger = new Flog('SYSTEM');
        return function (req, res: any, next: Function) {
            const start = +new Date();
            res.on('finish', () => {
                res.responseTime = (+new Date() - start) + "ms";
                let str = ':method :url :status :response-time'
                const logstr = getStr(str, req, res);
                logger.log(logstr);
            })
            return next();
        }
    }

    constructor(category: string) {
        this.category = category;
        this.isOnline = isOnline();
    }

    log(...arg) {
        flog('INFO', this.category, ...arg)
    }

    err(...arg) {
        logERR('ERROR', this.category, ...arg)
    }

    debug(...arg) {
        if (!this.isOnline) {
            flog('DEBUG', this.category, ...arg)
        }
    }

}