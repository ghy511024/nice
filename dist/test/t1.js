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
const nice_1 = require("../src/nice");
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
    xi1(req, res) {
        let { _id } = req.params;
        res.send('_id:' + _id);
    }
};
__decorate([
    nice_1.Get("/data"),
    nice_1.Mid(xixi(), haha),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], Home.prototype, "Filter", null);
__decorate([
    nice_1.All('/book'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], Home.prototype, "getBook", null);
__decorate([
    nice_1.All(':_id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], Home.prototype, "xi1", null);
Home = __decorate([
    nice_1.Controller('/active'),
    nice_1.Filter(hehe)
], Home);
let nice = new nice_1.Nice(app);
nice.use(Home);
app.use(function (req, res, next) {
    res.send('404 404');
});
let server = http.createServer(app);
server.listen(9001, () => {
    console.log("http://127.0.0.1:9001");
});
