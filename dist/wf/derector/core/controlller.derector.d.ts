export declare enum Scope {
    DEFAULT = 0,
    TRANSIENT = 1,
    REQUEST = 2
}
export interface ControllerOptions {
    scope?: Scope;
    path?: string;
}
export declare function Controller(): ClassDecorator;
export declare function Controller(prefix: string): ClassDecorator;
export declare function Controller(options: ControllerOptions): ClassDecorator;
