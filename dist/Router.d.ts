import { routerConfig } from './Config';
import * as koaRouter from 'koa-router';
export { Controller, Get, Post, Delete, Put, Patch, Options, Head, All, Filter, Mid } from './fun.decorator';
import { BasicRouter } from './BasicRouter';
import { Flog } from "./Log/FLog";
export declare class Router extends BasicRouter {
    constructor(app: any, config?: routerConfig);
    private initWF;
    private initWmonitor;
}
export declare class KRouter extends BasicRouter {
    constructor(app: koaRouter, config?: routerConfig);
}
export declare class WMonitor {
    static sum(value: number, count: number): void;
    static average(value: number, count: number): void;
    static max(value: number, count: number): void;
    static min(value: number, count: number): void;
}
export { Flog };
