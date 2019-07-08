import { RequestMappingMetadata } from '../../interfaces/request-mapping-metadata.interface';
import "reflect-metadata";
export declare enum Scope {
    DEFAULT = 0,
    TRANSIENT = 1,
    REQUEST = 2
}
export interface ControllerOptions {
    scope?: Scope;
    path?: string;
}
export declare const RequestMapping: (metadata?: RequestMappingMetadata) => MethodDecorator;
export declare function Controller(): ClassDecorator;
export declare function Controller(prefix: string): ClassDecorator;
export declare function Controller(options: ControllerOptions): ClassDecorator;
export declare const Post: (path?: string | string[]) => MethodDecorator;
export declare const Get: (path?: string | string[]) => MethodDecorator;
export declare const Delete: (path?: string | string[]) => MethodDecorator;
export declare const Put: (path?: string | string[]) => MethodDecorator;
export declare const Patch: (path?: string | string[]) => MethodDecorator;
export declare const Options: (path?: string | string[]) => MethodDecorator;
export declare const Head: (path?: string | string[]) => MethodDecorator;
export declare const All: (path?: string | string[]) => MethodDecorator;
export declare const Mid: (...arg: any[]) => (target: any, key: any, descriptor: PropertyDescriptor) => PropertyDescriptor;
export declare function Filter(...arg: any[]): ClassDecorator;
