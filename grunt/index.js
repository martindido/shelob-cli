'use strict';

var fs = require('fs');
var path = require('path');

module.exports = function(grunt) {
    require('load-grunt-config')(grunt, {
        configPath: __dirname + '/contrib'
    });
};
