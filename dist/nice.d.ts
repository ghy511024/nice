export { Controller, Get, Post, Delete, Put, Patch, Options, Head, All, Filter, Mid } from './fun.decorator';
interface niceConfig {
    wf?: {
        cluster: string;
        server?: string;
        debug?: boolean;
        interval?: number;
    };
}
export declare class Nice {
    private routesResolver;
    private config;
    private app;
    constructor(app: any, config?: niceConfig);
    use(...handlers: any[]): void;
    private initWF;
}
