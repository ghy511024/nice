export { Controller, Get, Post, Delete, Put, Patch, Options, Head, All, Filter, Mid } from './fun.decorator';
export declare class Nice {
    private routesResolver;
    constructor(app: any);
    use(...handlers: any[]): void;
}
