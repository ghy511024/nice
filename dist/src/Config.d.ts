export interface routerConfig {
    isKoa?: boolean;
    debug?: boolean;
    wf?: {
        cluster?: string;
        server?: string;
        interval?: number;
        close?: boolean;
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