declare class IPUtil {
    map: Map<number, {
        t: number;
        c: number;
    }>;
    constructor();
    check(ipStr: any): boolean;
    runTask(): void;
}
