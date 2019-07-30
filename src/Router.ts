import {RoutesResolver} from './derector/core/RoutesResolver';

export {
    Controller, Get, Post, Delete, Put, Patch, Options, Head, All, Filter, Mid
}from './fun.decorator';


import WFManager = require("wfmanager");

interface routerConfig {

    wf?: {
        cluster: string,  // 模拟服务所在集群名  例如 hbg_fangfe_node_fjson
        server?: string,  // 模拟服务器所在ip 地址 例如 "10.144.46.150:8888",
        debug?: boolean,  // 打印日志
        interval?:number  // 上报间隔时间 标准1分钟,调小主要是方便调试
    }
}

export class Router {

    private routesResolver: RoutesResolver;
    private config: routerConfig;
    private app: any;

    constructor(app, config?: routerConfig) {
        this.routesResolver = new RoutesResolver(app);
        this.config = config;
        this.app = app;
        this.initWF();

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

    private initWF() {
        this.app.use(WFManager.express());
        setTimeout(() => {
            let option = {urls: this.routesResolver.getAllPaths()};
            if (this.config && this.config.wf) {
                option = Object.assign(option, this.config.wf)
            }
            WFManager.init(option)
        }, 100)
    }

}