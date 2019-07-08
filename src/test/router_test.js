const express = require('express');
const router_test = express.Router();

const AJKLogin = require('../../dist/lib/express-middleware/login/AjkLogin').AjkLogin


router_test.get('/', async (req, res) => {
    res.send('home ok')
});

router_test.get('/test_ajk', AJKLogin.express(), async (req, res) => {
    authResult = req.userAuthResult
    console.log(authResult)
    res.send('test_ajk')
});

module.exports = router_test;