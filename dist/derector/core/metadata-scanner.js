"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetadataScanner = void 0;
const shared_utils_1 = require("../../utils/shared.utils");
const iterare_1 = require("iterare");
class MetadataScanner {
    scanFromPrototype(instance, prototype, callback) {
        return (0, iterare_1.default)([...this.getAllFilteredMethodNames(prototype)])
            .map(callback)
            .filter(metadata => !(0, shared_utils_1.isNil)(metadata))
            .toArray();
    }
    *getAllFilteredMethodNames(prototype) {
        do {
            yield* (0, iterare_1.default)(Object.getOwnPropertyNames(prototype))
                .filter(prop => {
                const descriptor = Object.getOwnPropertyDescriptor(prototype, prop);
                if (descriptor.set || descriptor.get) {
                    return false;
                }
                return !(0, shared_utils_1.isConstructor)(prop) && (0, shared_utils_1.isFunction)(prototype[prop]);
            })
                .toArray();
        } while ((prototype = Reflect.getPrototypeOf(prototype)) && prototype !== Object.prototype);
    }
}
exports.MetadataScanner = MetadataScanner;
