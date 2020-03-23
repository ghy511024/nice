import { routerConfig } from './Config';
import * as koaRouter from 'koa-router';
import * as koa from 'koa';
export { Controller, Get, Post, Delete, Put, Patch, Options, Head, All, Filter, Mid } from './fun.decorator';
import { BasicRouter } from './BasicRouter';
export declare class Router extends BasicRouter {
    constructor(app: any, config?: routerConfig);
    private initWF;
    private initWmonitor;
}
export declare class KoaRouter extends BasicRouter {
    constructor(app: koa, koaRouter: koaRouter, config: routerConfig);
}
export declare class WMonitor {
    static sum(value: number, count: number): void;
    static average(value: number, count: number): void;
    static max(value: number, count: number): void;
    static min(value: number, count: number): void;
}
