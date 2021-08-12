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
function mid1() {
    return function (req, res, next) {
        console.log('mid1:');
        next();
    };
}
function mid2() {
    return function (req, res, next) {
        console.log('mid2:');
        next();
    };
}
var Router_1 = require("../src/Router");
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
    Page.prototype.err = function (req, res) {
        JSON.parse("kk");
        res.send('err:');
    };
    __decorate([
        Router_1.Get("xixi")
    ], Page.prototype, "Filter", null);
    __decorate([
        Router_1.All('/nice/:_id')
    ], Page.prototype, "xi1", null);
    __decorate([
        Router_1.Get("err")
    ], Page.prototype, "err", null);
    Page = __decorate([
        Router_1.Controller(),
        Router_1.Filter(mid1())
    ], Page);
    return Page;
}());
var nice = new Router_1.Router(app, {
    debug: true,
    wf: {
        cluster: "hbg_fangfe_node_fjson",
        server: "10.144.46.150:8888",
    },
    wmonitor: {
        include: {
            "/": 12345,
        },
        exclude: ['/favicon.ico', '/nice/']
    }
});
nice.use('/', Page);
app.use(function (req, res, next) {
    res.send('404');
});
var server = http.createServer(app);
server.listen(9001, function () {
    console.log("http://127.0.0.1:9001");
});
