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
const Router_1 = require("../src/Router");
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
    data(req, res) {
        res.send('Home get Data');
    }
    getBook(req, res) {
        res.send('Home get home');
    }
    xi1(req, res) {
        let { _id } = req.params;
        res.send('_id:' + _id);
    }
};
__decorate([
    Router_1.Get("/data"),
    Router_1.Mid(xixi(), haha),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], Home.prototype, "data", null);
__decorate([
    Router_1.All('/book'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], Home.prototype, "getBook", null);
__decorate([
    Router_1.All(':_id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], Home.prototype, "xi1", null);
Home = __decorate([
    Router_1.Controller('/active'),
    Router_1.Filter(hehe)
], Home);
let Page = class Page {
    Filter(req, res) {
        res.send('page xixi');
    }
    xi1(req, res) {
        let { _id } = req.params;
        res.send('good id:' + _id);
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
Page = __decorate([
    Router_1.Controller('page')
], Page);
let nice = new Router_1.Router(app, {
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
let server = http.createServer(app);
server.listen(9001, () => {
    console.log("http://127.0.0.1:9001");
});
