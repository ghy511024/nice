export declare class Flog {
    private category;
    private isOnline;
    private static instance;
    static log(...arg: any[]): void;
    static err(...arg: any[]): void;
    static debug(...arg: any[]): void;
    static express(): (req: any, res: any, next: Function) => any;
    constructor(category: string);
    log(...arg: any[]): void;
    err(...arg: any[]): void;
    debug(...arg: any[]): void;
}
