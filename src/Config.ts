export interface routerConfig {
    isKoa?: boolean
    debug?: boolean
    xssFix?: boolean // xss 修复
    wf?: {
        cluster?: string,  // 模拟服务所在集群名  例如 hbg_fangfe_node_fjson
        server?: string,   // 模拟服务器所在ip 地址 例如 "10.144.46.150:8888",
        interval?: number  // 上报间隔时间 标准1分钟,调小主要是方便调试
        close?: boolean
        open?: boolean
    },
    wmonitor?: {
        include: {
            [key: string]: number // 页面域名正则匹配wmonitor
        },
        exclude?: string[],
        error?: number,
    }
}

export class Config {
    private static config: routerConfig;

    static setConfig(config: routerConfig) {
        this.config = config;
    }

    static getConfig(): routerConfig {
        return this.config
    }
}