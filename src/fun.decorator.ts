import {METHOD_METADATA, PATH_METADATA, MIDDLEWARE_METADATA, FILTER_METADATA} from './derector/constants';
import {RequestMethod} from './enums/request-method.enum';
import {RequestMappingMetadata} from './interfaces/request-mapping-metadata.interface';
import {isString, isUndefined} from "./utils/shared.utils";
import "reflect-metadata";

export enum Scope {
    DEFAULT,
    TRANSIENT,
    REQUEST,
}

export interface ControllerOptions {
    scope?: Scope;
    path?: string;
}

const defaultMetadata = {
    [PATH_METADATA]: '/',
    [METHOD_METADATA]: RequestMethod.GET,
};

export const RequestMapping = (metadata: RequestMappingMetadata = defaultMetadata,): MethodDecorator => {
    const pathMetadata = metadata[PATH_METADATA];
    let path
    if (typeof pathMetadata == "string") {
        path = pathMetadata && pathMetadata.length ? pathMetadata : '/';
    } else {
        path = pathMetadata;
    }
    const requestMethod = metadata[METHOD_METADATA] || RequestMethod.GET;
    return (target, key, descriptor: PropertyDescriptor) => {
        Reflect.defineMetadata(PATH_METADATA, path, descriptor.value);
        Reflect.defineMetadata(METHOD_METADATA, requestMethod, descriptor.value);
        return descriptor;
    };
};

const createMappingDecorator = (method: RequestMethod) => {
    return function (path?: string | string[] | RegExp | RegExp[]) {
        return RequestMapping({
            [PATH_METADATA]: path,
            [METHOD_METADATA]: method,
        });
    }
};

const createMidWareDecorator = () => {
    return function (arg) {
        return (target, key, descriptor: PropertyDescriptor) => {
            let midwareArray = Reflect.getMetadata(MIDDLEWARE_METADATA, target);

            if (midwareArray && midwareArray instanceof Array && midwareArray.length > 0) {
                let _arg;
                if (typeof arg == 'function') {
                    _arg = [arg]
                } else if (arg instanceof Array) {
                    _arg = arg
                }
                if (_arg) {
                    midwareArray = midwareArray.concat(_arg)
                }
            } else if (typeof arg == 'function') {
                midwareArray = [arg];
            } else if (arg instanceof Array) {
                midwareArray = arg;
            }

            Reflect.defineMetadata(MIDDLEWARE_METADATA, midwareArray, descriptor.value);
            return descriptor;
        };
    }
};


export function Controller(): ClassDecorator;
export function Controller(prefix: string): ClassDecorator;
export function Controller(options: ControllerOptions): ClassDecorator;
export function Controller(prefixOrOptions?: string | ControllerOptions): ClassDecorator {
    const defaultPath = '/';
    const [path, scopeOptions] = isUndefined(prefixOrOptions)
        ? [defaultPath, undefined]
        : isString(prefixOrOptions)
            ? [prefixOrOptions, undefined]
            : [prefixOrOptions.path || defaultPath, {scope: prefixOrOptions.scope}];

    return (target: object) => {
        Reflect.defineMetadata(PATH_METADATA, path, target);
    };
}

export const Post = createMappingDecorator(RequestMethod.POST);

export const Get = createMappingDecorator(RequestMethod.GET);

export const Delete = createMappingDecorator(RequestMethod.DELETE);

export const Put = createMappingDecorator(RequestMethod.PUT);

export const Patch = createMappingDecorator(RequestMethod.PATCH);

export const Options = createMappingDecorator(RequestMethod.OPTIONS);

export const Head = createMappingDecorator(RequestMethod.HEAD);

export const All = createMappingDecorator(RequestMethod.ALL);

export const Mid = createMidWareDecorator();

export function Filter(arg): ClassDecorator {
    return (target: object) => {
        if (typeof arg == 'function') {
            arg = [arg];
        }
        Reflect.defineMetadata(FILTER_METADATA, arg, target);
    };
}



