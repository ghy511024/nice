"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var app = express();
var http = require('http');
var Router_1 = require("../src/Router");
//=========这些都是中间件================
function xixi() {
    return function (req, res, next) {
        console.log('xixixixixix');
        next();
    };
}
function haha(req, res, next) {
    console.log('HAHHAHHHA');
    next();
}
function hehe(req, res, next) {
    console.log('hehe');
    next();
}
//=========中间件结束================
var Home = /** @class */ (function () {
    function Home() {
    }
    Home.prototype.data = function (req, res) {
        res.send('Home get Data');
    };
    Home.prototype.getBook = function (req, res) {
        res.send('Home get home');
    };
    Home.prototype.xi1 = function (req, res) {
        var _id = req.params._id;
        res.send('_id:' + _id);
    };
    __decorate([
        Router_1.Get("/data"),
        Router_1.Mid(xixi(), haha) // 方法中间件
    ], Home.prototype, "data", null);
    __decorate([
        Router_1.All('/book')
    ], Home.prototype, "getBook", null);
    __decorate([
        Router_1.All(':_id')
    ], Home.prototype, "xi1", null);
    Home = __decorate([
        Router_1.Controller('/active'),
        Router_1.Filter(hehe) // 全局中间件
    ], Home);
    return Home;
}());
var Page = /** @class */ (function () {
    function Page() {
    }
    Page.prototype.Filter = function (req, res) {
        res.send('page xixi');
    };
    Page.prototype.xi1 = function (req, res) {
        var _id = req.params._id;
        res.send('good id:' + _id);
    };
    __decorate([
        Router_1.Get("xixi")
    ], Page.prototype, "Filter", null);
    __decorate([
        Router_1.All('/nice/:_id')
    ], Page.prototype, "xi1", null);
    Page = __decorate([
        Router_1.Controller('page')
    ], Page);
    return Page;
}());
var nice = new Router_1.Router(app, {
    wf: {
        cluster: "hbg_fangfe_node_fjson",
        server: "10.144.46.150:8888",
        debug: true,
        interval: 10 * 1000
    }
});
nice.use('/home', Home);
nice.use(Page);
app.use(function (req, res, next) {
    res.send('404 404');
});
var server = http.createServer(app);
server.listen(9001, function () {
    console.log("http://127.0.0.1:9001");
});
