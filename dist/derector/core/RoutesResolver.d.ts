export declare class RoutesResolver {
    private routerBuilder;
    private applicationRef;
    private koaRouter;
    private metadataScanner;
    constructor(applicationRef: any);
    registerRouters(userRoutes: any, basePath?: any): void;
    getAllPaths(): (string | RegExp)[];
}
