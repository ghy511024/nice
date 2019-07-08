import {Injectable} from '../../interfaces/injectable.interface';
import {isConstructor, isFunction, isNil,} from '../../utils/shared.utils';
import iterate from 'iterare';

export class MetadataScanner {

    public scanFromPrototype<T extends Injectable, R>(  instance: T,  prototype: any, callback: (name: string) => R, ): R[] {

        return iterate([...this.getAllFilteredMethodNames(prototype)])
            .map(callback)
            .filter(metadata => !isNil(metadata))
            .toArray();
    }

    * getAllFilteredMethodNames(prototype: any): IterableIterator<string> {
        do {
            yield* iterate(Object.getOwnPropertyNames(prototype))
                .filter(prop => {
                    const descriptor = Object.getOwnPropertyDescriptor(prototype, prop);
                    if (descriptor.set || descriptor.get) {
                        return false;
                    }
                    return !isConstructor(prop) && isFunction(prototype[prop]);
                })
                .toArray();
        } while ((prototype = Reflect.getPrototypeOf(prototype)) && prototype !== Object.prototype);
    }
}
