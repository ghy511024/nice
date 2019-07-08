import "reflect-metadata";
import {METHOD_METADATA, PATH_METADATA, MIDDLEWARE_METADATA} from '../constants';
import {RequestMethod} from '../../enums/request-method.enum';
import {RouterProxyCallback} from './router-proxy';
import {Controller} from '../../interfaces/controller.interface';
import {Type} from '../../interfaces/type.interface';
import {isString, isUndefined, validatePath} from '../../utils/shared.utils';
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

    // private readonly executionContextCreator: RouterExecutionContext;

    private readonly routerMethodFactory = new RouterMethodFactory();
    private readonly exceptionFiltersCache = new WeakMap();
    private applicationRef: any;

    constructor(private readonly metadataScanner: MetadataScanner, applicationRef) {
        this.applicationRef = applicationRef;
    }

    public explore(instance, basePath: string, root_filter) {

        const routerPaths = this.scanForPaths(instance);

        this.applyPathsToRouterProxy(routerPaths, basePath, root_filter);
    }

    logger(...arg) {
        console.log(...arg)
    }

    public applyPathsToRouterProxy(routePaths: RoutePathProperties[], basePath: string, root_filter) {
        (routePaths || []).forEach(pathProperties => {
            const {path, requestMethod} = pathProperties;
            this.applyCallbackToRouter(pathProperties, basePath, root_filter);
            path.forEach(p => {
                    // this.logger('hahah:', p, requestMethod, requestMethod);
                }
            );
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

        // const {instance} = instanceWrapper;

        const routerMethod = this.routerMethodFactory.get(this.applicationRef, requestMethod).bind(this.applicationRef);

        let all_filter = []
        if (root_filter) {
            all_filter = all_filter.concat(root_filter)
        }
        if (midware) {
            all_filter = all_filter.concat(midware)
        }
        const stripSlash = (str: string) =>
            str[str.length - 1] === '/' ? str.slice(0, str.length - 1) : str;

        // const isRequestScoped = !instanceWrapper.isDependencyTreeStatic();
        // const module = this.container.getModuleByKey(moduleKey);


        const proxy = this.createCallbackProxy(
            // instance,
            targetCallback,
            // methodName,
            // moduleKey,
            // requestMethod,
        );
        paths.forEach(path => {
            const fullPath = stripSlash(basePath) + path;
            if (all_filter.length > 0) {
                routerMethod(stripSlash(fullPath) || '/', all_filter, proxy);
            } else {
                routerMethod(stripSlash(fullPath) || '/', proxy);
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
        // instance: Controller,
        callback: RouterProxyCallback,
        // methodName: string,
        // module: string,
        // requestMethod: RequestMethod,
        // inquirerId?: string,
    ) {
        return async (req, res, next,) => {
            await callback(req, res, next);
        }
    }

}
