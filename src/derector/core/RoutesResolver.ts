import {RouterExplorer} from './router-explorer';
import {MetadataScanner} from "./metadata-scanner";
import {FILTER_METADATA} from '../constants';
import * as koaRouter from 'koa-router';

export class RoutesResolver {

    private routerBuilder: RouterExplorer;
    private applicationRef: any;
    private koaRouter: koaRouter;
    private metadataScanner: MetadataScanner;

    constructor(applicationRef) {
        this.applicationRef = applicationRef;
        this.metadataScanner = new MetadataScanner();
        this.routerBuilder = new RouterExplorer(this.metadataScanner, this.applicationRef);
    }

    registerRouters(userRoutes, basePath?) {
        const basepath = this.routerBuilder.extractRouterPath(userRoutes, basePath,);

        let instance = new userRoutes();

        let filter = Reflect.getMetadata(FILTER_METADATA, userRoutes);

        this.routerBuilder.explore(instance, basepath, filter);
    }

    getAllPaths(): string[] {
        return this.routerBuilder.getAllpaths();
    }
}