import "reflect-metadata";

const PATH_METADATA = Symbol();
const METHOD_METADATA = Symbol();

function Controller(path: string): ClassDecorator {
    return (target: any) => {
        Reflect.defineMetadata(PATH_METADATA, path, target);
    }
}

function createMethod(method: string) {
    return (path: string): MethodDecorator => {
        return (target: any, key: string | symbol, descriptor: any) => {
            Reflect.defineMetadata(PATH_METADATA, path, target, descriptor.value);
            Reflect.defineMetadata(METHOD_METADATA, method, target, descriptor.value);
        }
    }
}
const Get = createMethod('get');
const Post = createMethod('post');


@Controller('/home')
class Home {

    @Get("/data")
    getData() {
        return "get data method!";
    }

    @Get('/book')
    getBook() {
        return "return book method!";
    }

    @Post('/register')
    register() {
        return 'register success!';
    }
}


function isFunction(arg: any): boolean {
    return typeof arg === 'function';
}

function isConstructor(arg: string) {
    return arg === 'constructor';
}

// 定义RouteInfo类型；
interface RouteInfo {
    rootPath: string,
    pathInfo: {
        path: string,
        method: string,
        fn: Function,
        methodName: string
    }[]
}

const mapRoute = (instance: Object): RouteInfo => {
    const prototype = Object.getPrototypeOf(instance);
    const rootPath = Reflect.getMetadata(PATH_METADATA, prototype.constructor);
    const properties = Object.getOwnPropertyNames(prototype).filter(item => !isConstructor(item) && isFunction(prototype[item]));
    let pathInfo = properties.map(item => {
        const path = Reflect.getMetadata(PATH_METADATA, prototype, prototype[item]);
        const method = Reflect.getMetadata(METHOD_METADATA, prototype, prototype[item]);
        return { path, method, fn: prototype[item], methodName: item };
    });
    return {
        rootPath,
        pathInfo
    };
}

let r = mapRoute(new Home())
console.log(r);
/**
 *
 {
    rootPath: '/home',
    pathInfo:
    [ { path: '/data',
        method: 'get',
        fn: [Function],
        methodName: 'getData' },
        { path: '/book',
        method: 'get',
        fn: [Function],
        methodName: 'getBook' },
        { path: '/register',
        method: 'post',
        fn: [Function],
        methodName: 'register' }
]
}
 */

// call method
let getData = r.pathInfo[0].fn.call(null);
console.log(getData); // get data method!

let register = r.pathInfo[2].fn.call(null);
console.log(register); // register success!

