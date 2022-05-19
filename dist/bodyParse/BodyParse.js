"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BodyParse = void 0;
const json_1 = require("./lib/types/json");
const urlencoded_1 = require("./lib/types/urlencoded");
class BodyParse {
    static json(option) {
        return json_1.json(option);
    }
    static urlencoded(option) {
        return urlencoded_1.urlencoded(option);
    }
}
exports.BodyParse = BodyParse;
