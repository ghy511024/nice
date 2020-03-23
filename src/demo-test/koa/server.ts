import * as  Koa from 'koa';
import {Middleware, Request} from 'koa'
import * as koaRouter from 'koa-router'
import {KRouter} from "../../Router";

import {HomeController} from './HomeController';
import {DemoController} from './DemoController';

const app = new Koa();
const port = 3001
let router = new koaRouter();
let nice = new KRouter( router, {
    debug: true
});

nice.use('/ghy', HomeController);
nice.use('/demo', DemoController);
app.use(router.routes()).use(router.allowedMethods());
// 响应

app.use((ctx) => {
    ctx.body = 'Hello Koa';
});


app.listen(port, () => {
    console.log(`server start: http://127.0.0.1:${port}`)
});