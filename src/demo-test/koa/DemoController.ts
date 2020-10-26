import {All, Controller, Filter, Get, Mid} from "../../fun.decorator";
import * as koa from 'koa';


@Controller('/')
export class DemoController {
    @Get("/di")
    data(ctx: koa.Context) {
        console.log('di')
        ctx.body = 'didid';
    }
    @Get("/ghy/:_xixi")
    xixi(ctx: koa.Context) {
        console.log('xixi')
        ctx.body = 'xixi';
    }

}
