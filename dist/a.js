"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const PATH_METADATA = Symbol();
const METHOD_METADATA = Symbol();
function Controller(path) {
    return (target) => {
        Reflect.defineMetadata(PATH_METADATA, path, target);
    };
}
function createMethod(method) {
    return (path) => {
        return (target, key, descriptor) => {
            Reflect.defineMetadata(PATH_METADATA, path, target, descriptor.value);
            Reflect.defineMetadata(METHOD_METADATA, method, target, descriptor.value);
        };
    };
}
const Get = createMethod('get');
const Post = createMethod('post');
let Home = class Home {
    getData() {
        return "get data method!";
    }
    getBook() {
        return "return book method!";
    }
    register() {
        return 'register success!';
    }
};
__decorate([
    Get("/data"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Home.prototype, "getData", null);
__decorate([
    Get('/book'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Home.prototype, "getBook", null);
__decorate([
    Post('/register'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Home.prototype, "register", null);
Home = __decorate([
    Controller('/home')
], Home);
function isFunction(arg) {
    return typeof arg === 'function';
}
function isConstructor(arg) {
    return arg === 'constructor';
}
const mapRoute = (instance) => {
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
};
let r = mapRoute(new Home());
console.log(r);
let getData = r.pathInfo[0].fn.call(null);
console.log(getData);
let register = r.pathInfo[2].fn.call(null);
console.log(register);
