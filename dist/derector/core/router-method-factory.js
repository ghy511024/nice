"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterMethodFactory = void 0;
const request_method_enum_1 = require("../../enums/request-method.enum");
class RouterMethodFactory {
    get(target, requestMethod) {
        switch (requestMethod) {
            case request_method_enum_1.RequestMethod.POST:
                return target.post;
            case request_method_enum_1.RequestMethod.ALL:
                return target.use;
            case request_method_enum_1.RequestMethod.DELETE:
                return target.delete;
            case request_method_enum_1.RequestMethod.PUT:
                return target.put;
            case request_method_enum_1.RequestMethod.PATCH:
                return target.patch;
            case request_method_enum_1.RequestMethod.OPTIONS:
                return target.options;
            case request_method_enum_1.RequestMethod.HEAD:
                return target.head;
            default: {
                return target.get;
            }
        }
    }
    getKoa(target, requestMethod) {
        switch (requestMethod) {
            case request_method_enum_1.RequestMethod.POST:
                return target.post;
            case request_method_enum_1.RequestMethod.ALL:
                return target.use;
            case request_method_enum_1.RequestMethod.DELETE:
                return target.delete;
            case request_method_enum_1.RequestMethod.PUT:
                return target.put;
            case request_method_enum_1.RequestMethod.PATCH:
                return target.patch;
            case request_method_enum_1.RequestMethod.OPTIONS:
                return target.options;
            case request_method_enum_1.RequestMethod.HEAD:
                return target.head;
            default: {
                return target.get;
            }
        }
    }
}
exports.RouterMethodFactory = RouterMethodFactory;
