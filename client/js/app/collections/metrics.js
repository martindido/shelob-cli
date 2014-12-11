'use strict';

var _ = require('underscore');
var Backbone = require('backbone-associations');
var Metric = require('../models/metric');
var socket = require('../socket');

module.exports = Backbone.Collection.extend({
    model: Metric,
    url: '/api/metrics',
    comparator: 'key',
    parse: parse,
    initialize: initialize,
    addMetrics: addMetrics,
    max: max,
});

function initialize() {
    socket.on('metrics add', this.addMetrics.bind(this));
}

function parse(metrics) {
    return metrics.reverse();
}

function addMetrics(metrics) {
    this.add(_.filter(metrics, function each(metric) {
        var model = this.get(metric.key);

        if (model) {
            model.addValues(metric.Values);
            return false
        }
    }, this).map(Metric.prototype.parse));
}

function max() {
    return _.max(this.map(function each(metric) {
        return metric.total();
    }));
}
