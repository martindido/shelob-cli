'use strict';

var os = require('os');
var cluster = require('cluster');

module.exports = function(done) {
    var cpuCount;
    var i;

    if (cluster.isMaster) {
        done.abort();
        cpuCount = os.cpus().length;

        for (i = cpuCount; --i > 0;) {
            cluster.fork();
        }
        return cluster.on('exit', function onClusterExit(worker) {
            console.log('Express server %d exiting', worker.id);
            cluster.fork();
        });
    }
    done.apply(null, [].slice.call(arguments, 1).concat([cluster.worker]));
};
