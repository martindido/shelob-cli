'use strict';

var Router = require('express').Router;
var _ = require('underscore');

module.exports = function route(app, callback) {
    var router = new Router();
    var providers = require('../providers').getProviders();

    function keys() {
        router.get('/', handler);

        function handler(req, res, next) {
            providers.historic.get({}, callback);

            function callback(metrics) {
                res.json(metrics || []);
            }
        }

        (function realtime() {
            if (providers.realtime) {
                providers.realtime.on('get', callback);
            }

            function callback(metrics) {
                app.io.emit('metrics add', metrics || []);
            }
        })();

        return handler;
    }


    router.path = '/metrics';
    router.routes = {
        keys: keys()
    };
    callback(router);
};
