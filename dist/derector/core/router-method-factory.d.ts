import { RequestMethod } from '../../enums/request-method.enum';
import * as koaRouter from 'koa-router';
export declare class RouterMethodFactory {
    get(target: any, requestMethod: RequestMethod): Function;
    getKoa(target: koaRouter, requestMethod: RequestMethod): Function;
}
