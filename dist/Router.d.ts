export { Controller, Get, Post, Delete, Put, Patch, Options, Head, All, Filter, Mid } from './fun.decorator';
interface routerConfig {
    wf?: {
        cluster: string;
        server?: string;
        debug?: boolean;
        interval?: number;
    };
}
export declare class Router {
    private routesResolver;
    private config;
    private app;
    constructor(app: any, config?: routerConfig);
    use(...handlers: any[]): void;
    private initWF;
}
