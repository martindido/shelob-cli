'use strict';

module.exports = function apiMetricRouter(app, router) {

    function keys() {
        router.post('/metric', handler);

        function handler(req, res, next) {
            res.json({
                123456709: {
                    value: 25
                },
                123456719: {
                    value: 2
                },
                123456729: {
                    value: 45
                },
                123456739: {
                    value: 135
                },
                123456759: {
                    value: 1
                }
            });
        }

        return handler;
    }

    return {
        keys: keys()
    };
};
