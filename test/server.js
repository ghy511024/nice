const express = require('express');

const app = express();
const path = require('path');
const http = require('http');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser({extended: false}));
app.use(cookieParser());

const router_test = express.Router({});

// router_test.
app.use(require('./router_test'));


// 启动进程
let server = http.createServer(app);
server.listen(9001, () => {
    console.log("http://127.0.0.1:9001")
});
