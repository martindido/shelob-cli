'use strict';

var ejs = require('ejs');
var path = require('path');
var express = require('express');

module.exports = function appConfiguration(done) {
    var app = express();
    var config = require('./config');
    var routers = require('./routers');

    app.disable('x-powered-by');
    app.use(express.static(__dirname + '/../public'));
    app.set('views', path.join(__dirname, '/views'));
    app.set('view engine', 'html');
    app.engine('html', ejs.renderFile);
    routers(app);

    done(app);
};
