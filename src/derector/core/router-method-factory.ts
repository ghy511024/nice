import {RequestMethod} from '../../enums/request-method.enum';
import * as koaRouter from 'koa-router';

export class RouterMethodFactory {
    public get(target, requestMethod: RequestMethod): Function {
        switch (requestMethod) {
            case RequestMethod.POST:
                return target.post;
            case RequestMethod.ALL:
                return target.use;
            case RequestMethod.DELETE:
                return target.delete;
            case RequestMethod.PUT:
                return target.put;
            case RequestMethod.PATCH:
                return target.patch;
            case RequestMethod.OPTIONS:
                return target.options;
            case RequestMethod.HEAD:
                return target.head;
            default: {
                return target.get;
            }
        }
    }

    public getKoa(target: koaRouter, requestMethod: RequestMethod): Function {
        switch (requestMethod) {
            case RequestMethod.POST:
                return target.post;
            case RequestMethod.ALL:
                return target.use;
            case RequestMethod.DELETE:
                return target.delete;
            case RequestMethod.PUT:
                return target.put;
            case RequestMethod.PATCH:
                return target.patch;
            case RequestMethod.OPTIONS:
                return target.options;
            case RequestMethod.HEAD:
                return target.head;
            default: {
                return target.get;
            }
        }
    }
}
