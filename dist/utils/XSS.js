"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XSSFix = void 0;
class XSSFix {
    static fixXss(req) {
        this.fix(req.body);
        this.fix(req.query);
    }
    static fix(body) {
        try {
            if (body && typeof body == "object") {
                for (var key in body) {
                    if (typeof body[key] == "string") {
                        let str = body[key];
                        str = str.replace(/</ig, "&lt;").replace(/>/ig, "&gt;").replace(/"/ig, "&quot;").replace(/'/ig, "&apos;");
                        body[key] = str;
                    }
                    else if (typeof body[key] == "object") {
                        this.fix(body[key]);
                    }
                }
            }
        }
        catch (e) {
        }
    }
}
exports.XSSFix = XSSFix;
