'use strict';

var Router = require('express').Router;
var _ = require('underscore');

module.exports = function route(app, callback) {
    var router = new Router();
    var providers = require('../providers').getProviders();

    function keys() {
        router.get('/', handler);

        function handler(req, res, next) {
            providers.historic.get(getOptions(req) || {}, callback);

            function callback(metrics) {
                res.json(metrics || []);
            }
        }

        function getOptions(req) {
            var key = req.param('key');
            var from = req.param('from');
            var to = req.param('to');
            var options = {
                where: {}
            };

            if (key) {
                options.where.key = {
                    like: key.replace(/\*/g, '%')
                };
            }
            if (from) {
                from = new Date(from);
            }
            if (to) {
                to = new Date(to);
            }
            if (from || to) {
                options.where['Values.createdAt'] = {};
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
            return _.isEmpty(options.where) ? undefined : options;
        }

        (function realtime() {
            if (providers.realtime) {
                providers.realtime.on('metric', callback);
            }

            function callback(metric) {
                app.io.emit('metric', metric);
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
