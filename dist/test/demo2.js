"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
const http = require('http');
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
const Router_1 = require("../src/Router");
let Page = class Page {
    Filter(req, res) {
        res.send('page xixi');
    }
    xi1(req, res) {
        let { _id } = req.params;
        res.send('good id:' + _id);
    }
    err(req, res) {
        JSON.parse("kk");
        res.send('err:');
    }
};
__decorate([
    Router_1.Get("xixi"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], Page.prototype, "Filter", null);
__decorate([
    Router_1.All('/nice/:_id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], Page.prototype, "xi1", null);
__decorate([
    Router_1.Get("err"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], Page.prototype, "err", null);
Page = __decorate([
    Router_1.Controller(),
    Router_1.Filter(mid1())
], Page);
let nice = new Router_1.Router(app, {
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
let server = http.createServer(app);
server.listen(9001, () => {
    console.log("http://127.0.0.1:9001");
});
