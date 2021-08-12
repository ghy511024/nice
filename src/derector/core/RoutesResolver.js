"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutesResolver = void 0;
var router_explorer_1 = require("./router-explorer");
var metadata_scanner_1 = require("./metadata-scanner");
var constants_1 = require("../constants");
var RoutesResolver = /** @class */ (function () {
    function RoutesResolver(applicationRef) {
        this.applicationRef = applicationRef;
        this.metadataScanner = new metadata_scanner_1.MetadataScanner();
        this.routerBuilder = new router_explorer_1.RouterExplorer(this.metadataScanner, this.applicationRef);
    }
    RoutesResolver.prototype.registerRouters = function (userRoutes, basePath) {
        var basepath = this.routerBuilder.extractRouterPath(userRoutes, basePath);
        var instance = new userRoutes();
        var filter = Reflect.getMetadata(constants_1.FILTER_METADATA, userRoutes);
        this.routerBuilder.explore(instance, basepath, filter);
    };
    RoutesResolver.prototype.getAllPaths = function () {
        return this.routerBuilder.getAllpaths();
    };
    return RoutesResolver;
}());
exports.RoutesResolver = RoutesResolver;
