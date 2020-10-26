import "reflect-metadata";
import {METHOD_METADATA, PATH_METADATA, MIDDLEWARE_METADATA} from '../constants';
import {RequestMethod} from '../../enums/request-method.enum';
import {RouterProxyCallback, RouterProxy} from './router-proxy';
import {Controller} from '../../interfaces/controller.interface';
import {Type} from '../../interfaces/type.interface';
import {isString, isUndefined, validatePath, cleanUrl} from '../../utils/shared.utils';
import {MetadataScanner} from './metadata-scanner';
import {RouterMethodFactory} from './router-method-factory';


export interface RoutePathProperties {
    path: string[];
    requestMethod: RequestMethod;
    targetCallback: RouterProxyCallback;
    methodName: string;
    midware: Function | Function[];
}

export class RouterExplorer {

    private readonly routerMethodFactory = new RouterMethodFactory();
    private readonly exceptionFiltersCache = new WeakMap();
    private applicationRef: any;
    private allPaths: string[] = [];
    private routerProxy = new RouterProxy()

    constructor(private readonly metadataScanner: MetadataScanner, applicationRef) {
        this.applicationRef = applicationRef;
    }

    public getAllpaths(): string[] {
        return this.allPaths;
    }

    public explore(instance, basePath: string, root_filter) {

        const routerPaths = this.scanForPaths(instance);

        this.applyPathsToRouterProxy(routerPaths, basePath, root_filter);
    }

    logger(...arg) {
        console.log(...arg)
    }

    public applyPathsToRouterProxy(routePaths: RoutePathProperties[], basePath: string, root_filter) {
        let pathArray = [];
        (routePaths || []).forEach(pathProperties => {
            const {path, requestMethod} = pathProperties;
            this.applyCallbackToRouter(pathProperties, basePath, root_filter);
        });
    }

    private applyCallbackToRouter(pathProperties: RoutePathProperties, basePath: string, root_filter) {
        const {
            path: paths,
            requestMethod,
            targetCallback,
            methodName,
            midware
        } = pathProperties;

        const routerMethod = this.routerMethodFactory.get(this.applicationRef, requestMethod).bind(this.applicationRef);

        let all_filter = []
        if (root_filter) {
            all_filter = all_filter.concat(root_filter)
        }
        if (midware) {
            all_filter = all_filter.concat(midware)
        }
        const proxy = this.createCallbackProxy(
            targetCallback,
        );

        paths.forEach(path => {
            const fullPath = cleanUrl(basePath) + path;
            this.allPaths.push(cleanUrl(fullPath) || '/')
            if (all_filter.length > 0) {
                let tmpArray = []
                tmpArray.push(cleanUrl(fullPath) || '/')
                tmpArray = tmpArray.concat(all_filter)
                tmpArray.push(proxy)
                routerMethod.apply(this, tmpArray)
                // routerMethod(cleanUrl(fullPath) || '/', all_filter[0], proxy);
            } else {
                routerMethod(cleanUrl(fullPath) || '/', proxy);
            }
        });

    }


    public extractRouterPath(
        metatype: Type<Controller>,
        prefix?: string,
    ): string {
        let path = Reflect.getMetadata(PATH_METADATA, metatype);
        if (prefix) path = prefix + this.validateRoutePath(path);
        return this.validateRoutePath(path);
    }

    public validateRoutePath(path: string): string {
        if (isUndefined(path)) {
            // throw new UnknownRequestMappingException();
            throw new Error('UnknownRequestMappingException');
        }
        return validatePath(path);
    }

    public scanForPaths(instance: Controller, prototype?: any,): RoutePathProperties[] {
        const instancePrototype = isUndefined(prototype) ? Object.getPrototypeOf(instance) : prototype;

        return this.metadataScanner.scanFromPrototype(instance, instancePrototype, method => {
                return this.exploreMethodMetadata(instance, instancePrototype, method)
            }
        );
    }

    public exploreMethodMetadata(
        instance: Controller,    // 实例
        instancePrototype: any,  // 实例的prototype
        methodName: string,      // 方法名
    ): RoutePathProperties {
        const targetCallback = instancePrototype[methodName];

        const routePath = Reflect.getMetadata(PATH_METADATA, targetCallback);

        // 中间件
        const midware = Reflect.getMetadata(MIDDLEWARE_METADATA, targetCallback);

        if (isUndefined(routePath)) {
            return null;
        }
        const requestMethod: RequestMethod = Reflect.getMetadata(
            METHOD_METADATA,
            targetCallback,
        );
        const path = isString(routePath)
            ? [this.validateRoutePath(routePath)]
            : routePath.map(p => this.validateRoutePath(p));
        return {
            path,
            requestMethod,
            targetCallback,
            midware,
            methodName,
        };
    }

    private createCallbackProxy(
        callback: RouterProxyCallback,
    ) {
        return this.routerProxy.createProxy(callback)
    }

}
