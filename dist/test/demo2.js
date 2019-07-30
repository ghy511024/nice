"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express = require('express');
const app = express();
const http = require('http');
const Router_1 = require("../src/Router");
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
    Router_1.Get("xixi"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], Page.prototype, "Filter", null);
tslib_1.__decorate([
    Router_1.All('/nice/:_id'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], Page.prototype, "xi1", null);
Page = tslib_1.__decorate([
    Router_1.Controller()
], Page);
let nice = new Router_1.Router(app, {
    wf: {
        cluster: "hbg_fangfe_node_fjson",
        server: "10.144.46.150:8888",
        debug: true,
        interval: 10 * 1000
    }
});
nice.use('/', Page);
app.use(function (req, res, next) {
    res.send('404 404');
});
let server = http.createServer(app);
server.listen(9001, () => {
    console.log("http://127.0.0.1:9001");
});
