import { RequestMethod } from '../../enums/request-method.enum';
export declare class RouterMethodFactory {
    get(target: any, requestMethod: RequestMethod): Function;
}