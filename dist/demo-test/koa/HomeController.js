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
exports.HomeController = void 0;
const fun_decorator_1 = require("../../fun.decorator");
const koa = require("koa");
async function mid1(ctx, next) {
    console.log('hehe');
    await next();
}
async function mid2(ctx, next) {
    console.log('yoyo');
    await next();
}
async function mid3(ctx, next) {
    console.log('yoy3');
    await next();
}
let HomeController = class HomeController {
    data(ctx) {
        console.log('2');
        ctx.body = 'haha';
    }
    test(ctx) {
        console.log('test');
        ctx.body = 'test';
    }
};
__decorate([
    fun_decorator_1.Get("/data"),
    fun_decorator_1.Mid([mid2, mid3]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HomeController.prototype, "data", null);
__decorate([
    fun_decorator_1.Get("/test"),
    fun_decorator_1.Mid(mid1),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HomeController.prototype, "test", null);
HomeController = __decorate([
    fun_decorator_1.Controller('/active')
], HomeController);
exports.HomeController = HomeController;
