"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const koaRouter = require("koa-router");
const Router_1 = require("../../Router");
const HomeController_1 = require("./HomeController");
const DemoController_1 = require("./DemoController");
const app = new Koa();
const port = 3001;
let router = new koaRouter();
let nice = new Router_1.KRouter(router, {
    debug: true
});
nice.use('/ghy', HomeController_1.HomeController);
nice.use('/demo', DemoController_1.DemoController);
app.use(router.routes()).use(router.allowedMethods());
app.use((ctx) => {
    ctx.body = 'Hello Koa';
});
app.listen(port, () => {
    console.log(`server start: http://127.0.0.1:${port}`);
});
