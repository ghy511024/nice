"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_explorer_1 = require("./core/router-explorer");
const metadata_scanner_1 = require("./core/metadata-scanner");
class RoutesResolver {
    constructor(applicationRef) {
        this.applicationRef = applicationRef;
        this.metadataScanner = new metadata_scanner_1.MetadataScanner();
        this.routerBuilder = new router_explorer_1.RouterExplorer(this.metadataScanner, this.applicationRef);
    }
    registerRouters(userRoutes, basePath) {
        const basepath = this.routerBuilder.extractRouterPath(userRoutes, basePath);
        let instance = new userRoutes();
        this.routerBuilder.explore(instance, basepath);
    }
}
exports.RoutesResolver = RoutesResolver;
