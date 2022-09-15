import {RoutesResolver} from './derector/core/RoutesResolver';
import {routerConfig, Config} from './Config'

import * as koaRouter from 'koa-router';
import * as koa from 'koa';

const pathRegexp = require('path-to-regexp')
export {
    Controller, Get, Post, Delete, Put, Patch, Options, Head, All, Filter, Mid
} from './fun.decorator';
import {Layer} from './utils/Layer'


import WFManager = require("wfmanager");
import {BasicRouter} from './BasicRouter'
import {Flog} from "./Log/FLog";
import {XSSFix} from "./utils/XSS";

const flog = new Flog('fang-router/Router')
const WM = require('wmonitor');

export class Router extends BasicRouter {
    constructor(app, config?: routerConfig) {
        super(app, config)
        if (config?.xssFix) {
            this.initXSSFix()
        }
        if (config?.wf?.open === true) {
            this.initWF();
        }
        if (config.wmonitor) {
            this.initWMonitor();
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
    private initWMonitor() {
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

    // 修复xss 漏洞
    private initXSSFix() {
        this.app.use((req, res, next) => {
            XSSFix.fixXss(req);
            next()
        });
    }

}

export class KRouter extends BasicRouter {
    constructor(app: koaRouter, config?: routerConfig) {
        super(app, config);
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


export {Flog}