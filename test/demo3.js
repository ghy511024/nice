var IPUtil = /** @class */ (function () {
    function IPUtil() {
        this.map = new Map();
        this.runTask();
    }
    IPUtil.prototype.check = function (ipStr) {
        var b = ipStr.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
        if (b.length < 5) {
            return false;
        }
        var ipArray = [Number(b[1]), Number(b[2]), Number(b[3]), Number(b[4])];
        var ipInt = Buffer.from(ipArray).readInt32LE(0);
        var data = this.map.get(ipInt);
        !data && (data = { t: (Date.now() / 1000) | 0, c: 0 });
        if (data.c++ > 1000) {
            return false;
        }
        this.map.set(ipInt, data);
    };
    IPUtil.prototype.runTask = function () {
        // 定时清理map
    };
    return IPUtil;
}());
