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
exports.DemoController = void 0;
const fun_decorator_1 = require("../../fun.decorator");
const koa = require("koa");
let DemoController = class DemoController {
    data(ctx) {
        console.log('di');
        ctx.body = 'didid';
    }
    xixi(ctx) {
        console.log('xixi');
        ctx.body = 'xixi';
    }
};
__decorate([
    fun_decorator_1.Get("/di"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DemoController.prototype, "data", null);
__decorate([
    fun_decorator_1.Get("/ghy/:_xixi"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DemoController.prototype, "xixi", null);
DemoController = __decorate([
    fun_decorator_1.Controller('/')
], DemoController);
exports.DemoController = DemoController;
