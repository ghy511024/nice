export interface routerConfig {
    debug?: boolean;
    wf?: {
        cluster: string;
        server?: string;
        interval?: number;
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
    static setConfig(): void;
    static getConfig(): void;
}
