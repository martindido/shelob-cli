'use strict';

var _ = require('underscore');

function option(grunt, keys, defaultValue) {
    var value = defaultValue;

    if (_.isString(keys)) {
        keys = [keys];
    }
    _.each(keys, function each(k) {
        value = grunt.option(k) || value;
    });
    return value;
}

module.exports = {
    option: option
};
