'use strict';

module.exports = function(grunt) {
    var browserify = {
        lib: {
            src: [],
            dest: 'public/js/src/libs.js',
            options: {
                alias: [
                    'node_modules/backbone/dist/jquery.js:jquery',
                    'node_modules/backbone-associations/backbone-associations.js:backbone-associations',
                    'node_modules/backbone/backbone.js:backbone',
                    'node_modules/underscore/underscore.js:underscore',
                    'node_modules/d3/d3.js:d3',
                    'node_modules/topojson.js:topojson'
                ]
            }
        },
        app: {
            src: ['client/js/app/**/*.js'],
            dest: 'public/js/src/app.js',
            options: {
                external: [
                    'jquery',
                    'backbone-associations',
                    'backbone',
                    'underscore',
                    'd3',
                    'topojson'
                ]
            }
        }
    };

    return browserify;
};
