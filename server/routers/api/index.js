'use strict';

var fs = require('fs');
var path = require('path');
var config = require('../../config');
var Provider = require('./providers').getProvider(config.get(['provider', 'name']));
var provider = new Provider(config.get(['provider', 'options']));

module.exports = function route(app, callback) {
    var routers = [];

    fs.readdirSync(__dirname + '/routes').forEach(function each(filename) {
        var name = path.basename(filename, '.js');

        if (name === 'index') {
            return;
        }
        require('./routes/' + name)(app, provider, function done(_routers) {
            if (!Array.isArray(_routers)) {
                _routers = [_routers];
            }
            _routers.forEach(function each(router) {
                router.path = '/api' + (router.path || '');
                routers.push(router);
            });
        });
    });
    callback(routers);
};
