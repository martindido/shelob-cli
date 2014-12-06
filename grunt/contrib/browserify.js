'use strict';

module.exports = function(grunt) {
    var browserify = {
        lib: {
            src: ['public/js/lib/**/*.js'],
            dest: 'public/js/src/libs.js',
            options: {
                alias: ['node_modules/backbone/backbone.js:backbone', 'node_modules/underscore/underscore.js:underscore']
            }
        },
        app: {
            src: ['client/js/app/**/*.js'],
            dest: 'public/js/src/app.js',
            options: {
                alias: []
            }
        }
    };

    return browserify;
};
