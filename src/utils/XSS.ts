/**
 * create by ghy 2022/9/15 11:11
 * @desc
 */
export class XSSFix {
    static fixXss(req) {
        this.fix(req.body);
        this.fix(req.query);
    }

    private static fix(body) {
        try {
            if (body && typeof body == "object") {
                for (var key in body) {
                    if (typeof body[key] == "string") {
                        let str = body[key]
                        str = str.replace(/</ig, "&lt;").replace(/>/ig, "&gt;").replace(/"/ig, "&quot;").replace(/'/ig, "&apos;");
                        body[key] = str;
                    } else if (typeof body[key] == "object") {
                        this.fix(body[key]);
                    }
                }
            }
        }catch (e) {}
    }
}