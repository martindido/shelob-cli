'use strict';

var asynquence = require('asynquence');

module.exports = function bootstrapApp(worker) {
    var config = require('./config');

    function bootstrap(app, server) {
        var port = config.get(['server', 'port'], 8080);

        server.listen(port, function onServerListening() {
            if (worker) {
                return console.log('id:%d pid:%d listening on port %d in %s mode', worker.id, process.pid, port, app.get('env'));
            }
            console.log('pid:%d listening on port %d in %s mode', process.pid, port, app.get('env'));
        });
    }

    function fail(error) {
        var log = '%j';

        if (error instanceof Error) {
            log = '%s';
            error = error.stack;
        }
        console.error(log, error);
    }

    asynquence().or(fail)
        .then(require('./app'))
        .val(bootstrap);
};
