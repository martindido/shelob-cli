'use strict';

var Router = require('express').Router;
var _ = require('underscore');

module.exports = function route(app, provider, callback) {
    var router = new Router();

    function keys() {
        router.get('/', handler);

        function handler(req, res, next) {
            provider.get({}, callback);

            function callback(metrics) {
                res.json(metrics || []);
            }
        }

        (function mock(argument) {
            var last = new Date();

            setInterval(function onInterval() {
                provider.get({
                    where: {
                        'Metrics.createdAt': {
                            gte: last
                        }
                    }
                }, callback);

                function callback(metrics) {
                    last = new Date();
                    app.io.emit('metrics add', metrics || []);
                }
            }, 10000);
        })();

        return handler;
    }


    router.path = '/metrics';
    router.routes = {
        keys: keys()
    };
    callback(router);
};
