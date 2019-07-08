
import {RoutesResolver} from './derector/core/RoutesResolver';

export {
    Controller, Get, Post, Delete, Put, Patch, Options, Head, All, Filter, Mid
}from './fun.decorator';

export class Nice {
    private routesResolver: RoutesResolver;

    constructor(app) {
        this.routesResolver = new RoutesResolver(app)
    }

    use(...handlers) {
        if (handlers.length >= 1) {
            let rootPath = ''
            if (typeof handlers[0] == 'string') {
                rootPath = handlers[0];
                handlers = handlers.splice(0, 1);
            }
            for (var i = 0; i < handlers.length; i++) {
                this.routesResolver.registerRouters(handlers[i], rootPath)
            }
        }
    }
}