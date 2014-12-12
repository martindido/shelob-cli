'use strict';

var Router = require('express').Router;
var _ = require('underscore');

module.exports = function route(app, callback) {
    var router = new Router();
    var providers = require('../providers').getProviders();

    function keys() {
        router.get('/', handler);

        function handler(req, res, next) {
            var options;
            var from = req.param('from');
            var to = req.param('to');

            if (from) {
                from = new Date(from);
            }
            if (to) {
                to = new Date(to);
            }
            if (from || to) {
                options = {
                    where: {
                        'Values.createdAt': {}
                    }
                };
                if (from && to) {
                    options.where['Values.createdAt'].between = [from, to];
                }
                else if (from) {
                    options.where['Values.createdAt'].gte = from;
                }
                else {
                    options.where['Values.createdAt'].lte = to;
                }
            }
            providers.historic.get(options || {}, callback);

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
