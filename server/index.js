'use strict';

var asynquence = require('asynquence');

module.exports = function() {
    var config = require('./config');
    var app = asynquence().or(uncaughtError);

    function uncaughtError(error) {
        var log = '%j';

        if (error instanceof Error) {
            log = '%s';
            error = error.stack;
        }
        console.error(log, error);
    }

    process.env.NODE_ENV = config.get('environment');

    if (config.get(['cluster', 'enabled'], false)) {
        app.then(require('./modules/cluster'));
    }

    app.val(require('./bootstrap'));
};
