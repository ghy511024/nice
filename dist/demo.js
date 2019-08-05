"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
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
tslib_1.__decorate([
    nice_1.Get("/data"),
    nice_1.Mid(xixi(), haha),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], Home.prototype, "data", null);
tslib_1.__decorate([
    nice_1.All('/book'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], Home.prototype, "getBook", null);
tslib_1.__decorate([
    nice_1.All(':_id'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], Home.prototype, "xi1", null);
Home = tslib_1.__decorate([
    nice_1.Controller('/active'),
    nice_1.Filter(hehe)
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
tslib_1.__decorate([
    nice_1.Get("xixi"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], Page.prototype, "Filter", null);
tslib_1.__decorate([
    nice_1.All('/nice/:_id'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], Page.prototype, "xi1", null);
Page = tslib_1.__decorate([
    nice_1.Controller('page')
], Page);
let nice = new nice_1.Router(app, {
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
