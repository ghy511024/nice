var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require('express');
const router_test = express.Router();
const AJKLogin = require('../../dist/lib/express-middleware/login/AjkLogin').AjkLogin;
router_test.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    res.send('home ok');
}));
router_test.get('/test_ajk', AJKLogin.express(), (req, res) => __awaiter(this, void 0, void 0, function* () {
    authResult = req.userAuthResult;
    console.log(authResult);
    res.send('test_ajk');
}));
module.exports = router_test;
