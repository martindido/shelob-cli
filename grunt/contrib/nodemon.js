'use strict';

module.exports = function(grunt) {
    function onLog(event) {
        console.log(event.colour);
    }

    return {
        start: {
            script: 'index',
            options: {
                env: {
                    DEBUG: 'shelob-cli:server*,shelob-cli:*:error'
                },
                ext: 'js,html',
                ignore: ['client', 'public'],
                callback: function(nodemon) {
                    nodemon.on('log', onLog);
                }
            }
        },
        debug: {
            script: 'index',
            options: {
                env: {
                    DEBUG: 'shelob-cli:*'
                },
                ext: 'js,html',
                ignore: ['client', 'public'],
                callback: function(nodemon) {
                    nodemon.on('log', onLog);
                }
            }
        }
    };
};
