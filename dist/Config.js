"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
class Config {
    static setConfig(config) {
        this.config = config;
    }
    static getConfig() {
        return this.config;
    }
}
exports.Config = Config;
