export interface routerConfig {
    isKoa?: boolean;
    debug?: boolean;
    xssFix?: boolean;
    wf?: {
        cluster?: string;
        server?: string;
        interval?: number;
        close?: boolean;
        open?: boolean;
    };
    wmonitor?: {
        include: {
            [key: string]: number;
        };
        exclude?: string[];
        error?: number;
    };
}
export declare class Config {
    private static config;
    static setConfig(config: routerConfig): void;
    static getConfig(): routerConfig;
}
