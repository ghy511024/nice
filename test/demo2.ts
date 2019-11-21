const express = require('express');
const app = express();
const http = require('http');

function mid1() {
    return function (req, res, next) {
        console.log('mid1:')
        next();
    }
}
function mid2() {
    return function (req, res, next) {
        console.log('mid2:')
        next();
    }
}

import {Router, Controller, Post, Get, Mid, Filter, All} from '../src/Router';

@Controller()
@Filter(mid1())
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
        debug: false,
        // interval: 10 * 1000
    }
});

nice.use('/', Page);

app.use(function (req, res, next) {
    res.send('404');
})

let server = http.createServer(app);
server.listen(9001, () => {
    console.log("http://127.0.0.1:9001")
});

