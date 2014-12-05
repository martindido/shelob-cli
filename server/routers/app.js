'use strict';

var Router = require('express').Router;

module.exports = function route(callback) {
    var router = new Router();

    function home() {
        router.get('/', handler);

        function handler(req, res, next) {
            res.render('index');
        }

        return handler;
    }

    router.routes = {
        home: home()
    };
    callback(router);
};
