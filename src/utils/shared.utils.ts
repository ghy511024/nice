export const isUndefined = (obj: any): obj is undefined => typeof obj === 'undefined';
export const isObject = (fn: any): fn is object => !isNil(fn) && typeof fn === 'object';
export const validatePath = (path?: string): string => path ? (path.charAt(0) !== '/' ? '/' + path : path) : '';
export const isFunction = (fn: any): boolean => typeof fn === 'function';
export const isString = (fn: any): fn is string => typeof fn === 'string';
export const isConstructor = (fn: any): boolean => fn === 'constructor';
export const isNil = (obj: any): obj is null | undefined => isUndefined(obj) || obj === null;
export const isEmpty = (array: any): boolean => !(array && array.length > 0);
export const isSymbol = (fn: any): fn is symbol => typeof fn === 'symbol';
export const cleanUrl = (str: string) => {
    let result = str
    result = result.replace(/^\/+/gi, '/')
    if (result[result.length - 1] === '/') {

        result = result.slice(0, result.length - 1)
    }
    return result;
}