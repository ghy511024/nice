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
    registerRouters(userRoutes, applicationRef, basePath) {
        const path = this.routerBuilder.extractRouterPath(userRoutes, basePath);
        console.log('path', path);
    }
}
exports.RoutesResolver = RoutesResolver;
