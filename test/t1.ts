
const express = require('express');
const app = express();
const http = require('http');

import {Nice, Controller, Post, Get, Mid, Filter, All} from '../src/nice';

//=========这些都是中间件================
function xixi() {
    return function (req, res, next) {
        console.log('xixixixixix')
        next();
    }
}

function haha(req, res, next) {
    console.log('HAHHAHHHA')
    next();
}

function hehe(req, res, next) {
    console.log('hehe')
    next();
}

//=========中间件结束================

@Controller('/active')
@Filter(hehe)         // 全局中间件
class Home {

    @Get("/data")
    @Mid(xixi(), haha)  // 方法中间件
    Filter(req, res) {
        res.send('ohahddaha');
    }

    @All('/book')
    getBook(req, res) {
        res.send('bok');
    }
}


var nice = new Nice(app)
nice.use(Home);
app.use(function (req, res, next) {
    res.send('404 404');
})

let server = http.createServer(app);
server.listen(9001, () => {
    console.log("http://127.0.0.1:9001")
});

