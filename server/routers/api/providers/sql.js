'use strict';

var _ = require('underscore');

function Sql() {}

Sql.prototype.get = function(callback) {
    var now = Date.now();
    var metrics = {};

    _.range(10).forEach(function each(i) {
        metrics[now - i * 1000] = Math.floor((Math.random() * 25) + 1);
    });
    callback(null, metrics);
}

module.exports = Sql;
