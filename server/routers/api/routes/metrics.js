'use strict';

var Router = require('express').Router;
var _ = require('underscore');
var config = require('../../../config');

module.exports = function route(app, callback) {
    var router = new Router();
    var providers = require('../providers').getProviders();
    var rDot = /\./g;
    var rWild = /\*/g;
    var rCountry = /\{country\}/g;
    var countries = config.world.map(function each(country) {
        return country.id;
    });

    function metrics() {
        router.get('/', handler);

        function handler(req, res, next) {
            providers.historic.get(getOptions(req) || {}, callback);

            function callback(metrics) {
                res.json(filter(req, metrics || []));
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
                    like: key.replace(rWild, '%').replace(rCountry, '%')
                };
            }
            if (from) {
                from = new Date(from);
            }
            if (to) {
                to = new Date(to);
            }
            if (from || to) {
                options.include = providers.historic.models.value;
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

        function filter(req, metrics) {
            var key = req.param('key');
            var rKey;

            if (!metrics.length || !key) {
                return metrics;
            }
            rKey = new RegExp(key.replace(rDot, '\\.').replace(rWild, '.*').replace(rCountry, '([a-z]{3})'));
            return metrics.filter(function each(metric) {
                var match = rKey.exec(metric.key);

                if (!match) {
                    return false;
                }
                return _.contains(countries, match[1]);
            });
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
        metrics: metrics()
    };
    callback(router);
};
