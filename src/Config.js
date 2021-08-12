"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
var Config = /** @class */ (function () {
    function Config() {
    }
    Config.setConfig = function (config) {
        this.config = config;
    };
    Config.getConfig = function () {
        return this.config;
    };
    return Config;
}());
exports.Config = Config;
