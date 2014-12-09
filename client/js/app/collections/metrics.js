'use strict';

var Backbone = require('backbone');
var Metric = require('../models/metric');
var socket = require('../socket');

module.exports = Backbone.Collection.extend({
    model: Metric,
    url: '/api/metrics',
    parse: parse,
    initialize: initialize,
    addMetrics: addMetrics
});

function parse(metrics) {
    return metrics.reverse();
}

function initialize() {
    socket.on('metrics add', this.addMetrics.bind(this));
}

function addMetrics(metrics) {
    this.add(metrics.map(Metric.prototype.parse));
}
