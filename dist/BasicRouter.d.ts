import { RoutesResolver } from "./derector/core/RoutesResolver";
import { routerConfig } from "./Config";
import { Layer } from "./utils/Layer";
export declare class BasicRouter {
    routesResolver: RoutesResolver;
    config: routerConfig;
    app: any;
    layers: Layer[];
    exlayers: Layer[];
    constructor(app: any, config?: routerConfig);
    use(...handlers: any[]): void;
}
