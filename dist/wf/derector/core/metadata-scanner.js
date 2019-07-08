"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_utils_1 = require("../../utils/shared.utils");
const iterare_1 = require("iterare");
class MetadataScanner {
    scanFromPrototype(instance, prototype, callback) {
        return iterare_1.default([...this.getAllFilteredMethodNames(prototype)])
            .map(callback)
            .filter(metadata => !shared_utils_1.isNil(metadata))
            .toArray();
    }
    *getAllFilteredMethodNames(prototype) {
        console.log('prototype', prototype);
        do {
            yield* iterare_1.default(Object.getOwnPropertyNames(prototype))
                .filter(prop => {
                const descriptor = Object.getOwnPropertyDescriptor(prototype, prop);
                if (descriptor.set || descriptor.get) {
                    return false;
                }
                return !shared_utils_1.isConstructor(prop) && shared_utils_1.isFunction(prototype[prop]);
            })
                .toArray();
        } while ((prototype = Reflect.getPrototypeOf(prototype)) && prototype !== Object.prototype);
    }
}
exports.MetadataScanner = MetadataScanner;
