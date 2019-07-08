"use strict";
const Nice_1 = require("../nice/Nice");
let nice = new Nice_1.Nice(app);
let home = require('home');
module.exports = function (app) {
    nice.use('/active/', home);
    app.use('/active/', require('../controller/HomeController'));
};
