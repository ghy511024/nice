"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Injectable(options) {
    return (target) => {
        Reflect.defineMetadata('ghy_mid', options, target);
    };
}
exports.Injectable = Injectable;
