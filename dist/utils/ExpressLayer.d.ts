export declare class Layer {
    private params;
    private pathUrl;
    private regexp;
    private keys;
    constructor(path: any, options: any);
    match(path: any): boolean;
    getPath(): string;
    private decode_param;
}
