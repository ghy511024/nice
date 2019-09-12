const express = require('express');
const app = express();
const http = require('http');

import {Router, Controller, Post, Get, Mid, Filter, All} from '../src/Router';

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
    data(req, res) {
        res.send('Home get Data');
    }

    @All('/book')
    getBook(req, res) {
        res.send('Home get home');
    }

    @All(':_id')
    xi1(req, res) {
        let {_id} = req.params;
        res.send('_id:' + _id);
    }
}


@Controller('page')
class Page {
    @Get("xixi")
    Filter(req, res) {
        res.send('page xixi');
    }

    @All('/nice/:_id')
    xi1(req, res) {
        let {_id} = req.params;
        res.send('good id:' + _id);
    }
}


let nice = new Router(app, {
    wf: {
        cluster: "hbg_fangfe_node_fjson",
        server: "10.144.46.150:8888",
        debug: true,
        interval: 10 * 1000
    }
});
nice.use('/home',Home);
nice.use(Page);

app.use(function (req, res, next) {
    res.send('404 404');
})

let server = http.createServer(app);
server.listen(9001, () => {
    console.log("http://127.0.0.1:9001")
});

