import "reflect-metadata";
import { RequestMethod } from '../../enums/request-method.enum';
import { RouterProxyCallback } from './router-proxy';
import { Controller } from '../../interfaces/controller.interface';
import { Type } from '../../interfaces/type.interface';
import { MetadataScanner } from './metadata-scanner';
export interface RoutePathProperties {
    path: string[];
    requestMethod: RequestMethod;
    targetCallback: RouterProxyCallback;
    methodName: string;
    midware: Function | Function[];
}
export declare class RouterExplorer {
    private readonly metadataScanner;
    private readonly routerMethodFactory;
    private readonly exceptionFiltersCache;
    private applicationRef;
    constructor(metadataScanner: MetadataScanner, applicationRef: any);
    explore(instance: any, basePath: string, root_filter: any): void;
    logger(...arg: any[]): void;
    applyPathsToRouterProxy(routePaths: RoutePathProperties[], basePath: string, root_filter: any): void;
    private applyCallbackToRouter;
    extractRouterPath(metatype: Type<Controller>, prefix?: string): string;
    validateRoutePath(path: string): string;
    scanForPaths(instance: Controller, prototype?: any): RoutePathProperties[];
    exploreMethodMetadata(instance: Controller, instancePrototype: any, methodName: string): RoutePathProperties;
    private createCallbackProxy;
}
