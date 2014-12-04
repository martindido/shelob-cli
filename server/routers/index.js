'use strict';

var fs = require('fs');
var path = require('path');
var express = require('express');

module.exports = function routers(app) {
    fs.readdirSync(__dirname).forEach(function(filename) {
        var name = path.basename(filename, '.js');

        if (name === 'index') {
            return;
        }
        require('./' + name)(app, express.Router());
    });
};
