// class Fatory {
//     constructor() {
//
//     }
//
//     create(_path, instance) {
//
//     }
//
//     use(app, instance) {
//
//     }
// }

import {Nice} from '../nice/Nice';
let nice = new Nice(app);

let home = require('home')

export = function (app) {
    nice.use('/active/', home);

    app.use('/active/', require('../controller/HomeController'));
};