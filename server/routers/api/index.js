'use strict';

var fs = require('fs');
var path = require('path');

module.exports = function apiRouter(app, router) {
    fs.readdirSync(__dirname).forEach(function(filename) {
        var name = path.basename(filename, '.js');

        if (name === 'index') {
            return;
        }
        require('./' + name)(app, router);
    });
};
