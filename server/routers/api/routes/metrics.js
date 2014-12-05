'use strict';

var Router = require('express').Router;

module.exports = function route(provider, callback) {
    var router = new Router();

    function keys() {
        router.get('/', handler);

        function handler(req, res, next) {
            provider.get(callback);

            function callback(err, metrics) {
                res.json(metrics || {});
            }
        }

        return handler;
    }

    router.path = '/metrics';
    router.routes = {
        keys: keys()
    };
    callback(router);
};
