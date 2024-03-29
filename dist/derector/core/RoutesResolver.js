"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutesResolver = void 0;
const router_explorer_1 = require("./router-explorer");
const metadata_scanner_1 = require("./metadata-scanner");
const constants_1 = require("../constants");
class RoutesResolver {
    constructor(applicationRef) {
        this.applicationRef = applicationRef;
        this.metadataScanner = new metadata_scanner_1.MetadataScanner();
        this.routerBuilder = new router_explorer_1.RouterExplorer(this.metadataScanner, this.applicationRef);
    }
    registerRouters(userRoutes, basePath) {
        const basepath = this.routerBuilder.extractRouterPath(userRoutes, basePath);
        let instance = new userRoutes();
        let filter = Reflect.getMetadata(constants_1.FILTER_METADATA, userRoutes);
        this.routerBuilder.explore(instance, basepath, filter);
    }
    getAllPaths() {
        return this.routerBuilder.getAllpaths();
    }
}
exports.RoutesResolver = RoutesResolver;
