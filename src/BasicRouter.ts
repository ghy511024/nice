import {RoutesResolver} from "./derector/core/RoutesResolver";
import {Config, routerConfig} from "./Config";
import {Layer} from "./utils/Layer";
import * as koaRouter from "koa-router";

export class BasicRouter {
    public routesResolver: RoutesResolver;
    public config: routerConfig;
    public app: any;
    public layers: Layer[] = [];
    public exlayers: Layer[] = [];

    constructor(app, config?: routerConfig) {
        this.config = config || {};
        Config.setConfig(config);
        this.app = app;
        this.routesResolver = new RoutesResolver(app);
    }

    use(...handlers: any[]) {
        if (handlers.length >= 1) {
            let rootPath = ''
            if (typeof handlers[0] == 'string') {
                rootPath = handlers[0];
                handlers.splice(0, 1);
            }
            for (var i = 0; i < handlers.length; i++) {
                this.routesResolver.registerRouters(handlers[i], rootPath)
            }
        }
    }
}
