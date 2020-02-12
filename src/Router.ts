import {RoutesResolver} from './derector/core/RoutesResolver';
import {routerConfig, Config} from './Config'

const pathRegexp = require('path-to-regexp')
export {
    Controller, Get, Post, Delete, Put, Patch, Options, Head, All, Filter, Mid
} from './fun.decorator';
import {Layer} from './utils/Layer'


import WFManager = require("wfmanager");

const flog = require('@fang/flog').getLog('fang-router/Router')
const WM = require('wmonitor');


export class Router {

    private routesResolver: RoutesResolver;
    private config: routerConfig;
    private app: any;
    private layers: Layer[] = [];
    private exlayers: Layer[] = [];

    constructor(app, config?: routerConfig) {
        this.routesResolver = new RoutesResolver(app);
        this.config = config||{};
        Config.setConfig(config);
        this.app = app;
        this.initWF();
        this.initWmonitor();
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

    // 加载wfmanager 插件
    private initWF() {
        this.app.use(WFManager.express());
        setTimeout(() => {
            let option = {urls: this.routesResolver.getAllPaths()};
            if (this.config && this.config.wf) {
                option = Object.assign(option, this.config.wf)
            }
            option['debug'] = !!this.config.debug;
            WFManager.init(option)
        }, 100)
    }

    // 加载wmonitor 插件
    private initWmonitor() {
        if (this.config.wmonitor?.include && typeof this.config.wmonitor?.include == 'object') {
            for (let key in this.config.wmonitor.include) {
                let layer = new Layer(key, {wpoint: this.config.wmonitor.include[key]});
                this.layers.push(layer);
            }

            if (this.config.wmonitor?.exclude) {
                for (let key of this.config.wmonitor.exclude) {
                    let layer = new Layer(key, {wpoint: this.config.wmonitor.include[key]});
                    this.exlayers.push(layer);
                }
            }

            this.app.use((req, res, next) => {
                for (let i = 0; i < this.layers.length; i++) {
                    if (this.layers[i].match(req.url)) {
                        let isExculde = false;
                        for (let j = 0; j < this.exlayers.length; j++) {
                            if (this.exlayers[j].match(req.url)) {
                                isExculde = true;
                            }
                        }
                        if (!isExculde) {
                            if (!!this.config.debug) {
                                flog.debug('wmonitor success', "reg:", this.layers[i].getPath(), 'url:', req.url, this.layers[i].getPoint())
                            }
                            WM.sum(this.layers[i].getPoint(), 1)
                        } else {
                            if (!!this.config.debug) {
                                flog.debug('wmonitor success but exclude', "reg:", this.layers[i].getPath(), 'url:', req.url)
                            }
                        }
                        break;
                    }
                }
                next();
            })
        }
    }
}

export class WMonitor {
    static sum(value: number, count: number) {
        WM.sum(value, count)
    }

    static average(value: number, count: number) {
        WM.average(value, count)
    }

    static max(value: number, count: number) {
        WM.max(value, count)
    }

    static min(value: number, count: number) {
        WM.min(value, count)
    }
}