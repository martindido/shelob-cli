'use strict';

var _ = require('underscore');
var time = require('./time');
var linker = require('./linker');
var string = require('./string');
var isServer = (typeof window === 'undefined');

function get(obj, keys, defaultValue) {
    var value;

    if (!Array.isArray(keys)) {
        if (typeof keys === 'undefined') {
            keys = [];
        } else {
            keys = [keys];
        }
    }
    if (typeof defaultValue === 'undefined') {
        defaultValue = null;
    }
    if (!keys.length) {
        return defaultValue || obj;
    }
    keys.every(function iterate(key, index) {
        try {
            if (!index) {
                value = obj[key];
            }
            else {
                value = value[key];
            }
        }
        catch (err) {
            value = null;
            return false;
        }
        return true;
    });
    if (typeof value === 'undefined' || value === null) {
        return defaultValue;
    }
    return _.isFunction(value) ? value : _.clone(value);
}

module.exports = _.extend({
    isServer: isServer,
    get: get
}, time, linker, string);
