'use strict';

module.exports = function appRouter(app, router) {

    function home() {
        app.get('/', handler);

        function handler(req, res, next) {
            res.render('index', {
                name: 'Milo'
            });
        }

        return handler;
    }

    return {
        home: home()
    };
};
