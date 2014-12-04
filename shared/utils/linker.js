'use strict';

var _ = require('underscore');
var qs = require('querystring');

function params(url, keys, value) {
    var parts = url.split('?');
    var parameters = {};
    var out = [];

    out.push(parts.shift());
    if (parts.length) {
        parameters = qs.parse(parts.join('?'));
    }
    if (_.isObject(keys)) {
        parameters = _.extend(parameters, keys);
    }
    else if (!value) {
        return parameters[keys];
    }
    else {
        parameters[keys] = value;
    }
    if (!_.isEmpty(parameters)) {
        out.push('?');
        out.push(qs.stringify(parameters));
    }
    if (url.slice(url.length - 1) === '#') {
        out.push('#');
    }
    return out.join('');
}

function removeParams(url, keys) {
    var parts = url.split('?');
    var parameters = {};
    var out = [];

    out.push(parts.shift());
    if (parts.length) {
        parameters = qs.parse(parts.join('?'));
    }
    if (_.isObject(keys)) {
        parameters = _.filter(parameters, function filter(key) {
            return !_.contains(keys, key);
        });
    }
    else {
        delete parameters[keys];
    }
    if (!_.isEmpty(parameters)) {
        out.push('?');
        out.push(qs.stringify(parameters));
    }
    if (url.slice(url.length - 1) === '#') {
        out.push('#');
    }
    return out.join('');
}

function cleanParams(url) {
    var parts = url.split('?');
    var out = [];

    out.push(parts.shift());
    if (url.slice(url.length - 1) === '#') {
        out.push('#');
    }
    return out.join('');
}

module.exports = {
    params: params,
    removeParams: removeParams,
    cleanParams: cleanParams
};
