import "reflect-metadata";
import { RequestMethod } from '../../enums/request-method.enum';
import { RouterProxyCallback } from './router-proxy';
import { Controller } from '../../interfaces/controller.interface';
import { Type } from '../../interfaces/type.interface';
import { MetadataScanner } from './metadata-scanner';
export interface RoutePathProperties {
    path: string[] | RegExp[];
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
    private allPaths;
    private routerProxy;
    constructor(metadataScanner: MetadataScanner, applicationRef: any);
    getAllpaths(): (string | RegExp)[];
    explore(instance: any, basePath: string | RegExp, root_filter: any): void;
    logger(...arg: any[]): void;
    applyPathsToRouterProxy(routePaths: RoutePathProperties[], basePath: string | RegExp, root_filter: any): void;
    private applyCallbackToRouter;
    extractRouterPath(metatype: Type<Controller>, prefix?: string): string | RegExp;
    validateRoutePath(path: string | RegExp): string | RegExp;
    scanForPaths(instance: Controller, prototype?: any): RoutePathProperties[];
    exploreMethodMetadata(instance: Controller, instancePrototype: any, methodName: string): RoutePathProperties;
    private createCallbackProxy;
}
