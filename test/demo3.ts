class IPUtil {
    map: Map<number, { t: number, c: number }> = new Map<number, { t: number, c: number }>();

    constructor() {
        this.runTask();
    }

    check(ipStr) {
        let b = ipStr.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/)
        if (b.length < 5) {
            return false;
        }
        let ipArray = [Number(b[1]), Number(b[2]), Number(b[3]), Number(b[4])];
        let ipInt = Buffer.from(ipArray).readInt32LE(0);
        let data = this.map.get(ipInt);
        !data && (data = {t: (Date.now() / 1000) | 0, c: 0})
        if (data.c++ > 1000) {
            return false;
        }
        this.map.set(ipInt, data)
    }

    runTask() {
        // 定时清理map
    }
}


