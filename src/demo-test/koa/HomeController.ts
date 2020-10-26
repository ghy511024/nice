import {All, Controller, Filter, Get, Mid} from "../../fun.decorator";
import * as koa from 'koa';

async function mid1(ctx: koa.Context, next: koa.Next) {
    console.log('hehe')
    await next();
}

async function mid2(ctx: koa.Context, next: koa.Next) {
    console.log('yoyo')
    await next();
}

async function mid3(ctx: koa.Context, next: koa.Next) {
    console.log('yoy3')
    await next();
}

@Controller('/active')
export class HomeController {
    @Get("/data")
    @Mid([mid2, mid3])
    data(ctx: koa.Context) {
        console.log('2')
        ctx.body = 'haha';
    }

    @Get("/test")
    @Mid(mid1)
    test(ctx: koa.Context) {
        console.log('test')
        ctx.body = 'test';
    }
}
