import { routerConfig } from './Config';
export { Controller, Get, Post, Delete, Put, Patch, Options, Head, All, Filter, Mid } from './fun.decorator';
export declare class Router {
    private routesResolver;
    private config;
    private app;
    private layers;
    private exlayers;
    constructor(app: any, config?: routerConfig);
    use(...handlers: any[]): void;
    private initWF;
    private initWmonitor;
}
export declare class WMonitor {
    static sum(value: number, count: number): void;
    static average(value: number, count: number): void;
    static max(value: number, count: number): void;
    static min(value: number, count: number): void;
}
