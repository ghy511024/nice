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
const Nice_1 = require("../nice/Nice");
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
let Home = class Home {
    Filter(req, res) {
        res.send('ohahddaha');
    }
    getBook(req, res) {
        res.send('bok');
    }
};
__decorate([
    Nice_1.Get("/data"),
    Nice_1.Mid(xixi(), haha),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], Home.prototype, "Filter", null);
__decorate([
    Nice_1.All('/book'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], Home.prototype, "getBook", null);
Home = __decorate([
    Nice_1.Controller('/active'),
    Nice_1.Filter(hehe)
], Home);
var nice = new Nice_1.Nice(app);
nice.use(Home);
app.use(function (req, res, next) {
    res.send('404 404');
});
let server = http.createServer(app);
server.listen(9001, () => {
    console.log("http://127.0.0.1:9001");
});
