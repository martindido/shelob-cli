'use strict';

var _ = require('underscore');
var Backbone = require('backbone-associations');
var Metric = require('../models/metric');
var Value = require('../models/value');
var socket = require('../socket');

module.exports = Backbone.Collection.extend({
    model: Metric,
    url: '/api/metrics',
    comparator: 'key',
    initialize: initialize,
    clear: clear,
    parse: parse,
    addMetric: addMetric,
    getMax: getMax,
    getMin: getMin,
    getMaxs: getMaxs,
    getMins: getMins,
    getKeys: getKeys,
    purge: purge
});

function initialize() {
    this.clear();
    this.on('add:Values', this.clear, this);
    socket.on('metric', this.addMetric.bind(this));
}

function clear() {
    this.max = 0;
    this.min = 0;
    this.maxs = [];
    this.mins = [];
    this.keys = [];
}

function parse(metrics) {
    return metrics.reverse();
}

function addMetric(metric) {
    var model = this.get(metric.key);

    if (!model) {
        return;
    }
    model.get('Values').add({
        count: metric.value
    });
}

function getMax() {
    this.max = this.max || (function max() {
        if (!this.length) {
            return 0;
        }
        return _.max(this.getMaxs());
    }.bind(this))();
    return this.max;
}

function getMin() {
    this.min = this.min || (function min() {
        if (!this.length) {
            return 0;
        }
        return _.min(this.getMins());
    }.bind(this))();
    return this.min;
}

function getMaxs() {
    this.maxs = this.maxs.length ? this.maxs : this.map(function each(metric) {
        return metric.getMax();
    });
    return this.maxs;
}

function getMins() {
    this.mins = this.mins.length ? this.mins : this.map(function each(metric) {
        return metric.getMin();
    });
    return this.mins;
}

function getKeys() {
    this.keys = this.keys.length ? this.keys : this.map(function each(metric) {
        return metric.get('key')
    });
    return this.keys;
}

function purge(from) {
    this.remove(this.filter(function each(metric) {
        return !metric.get('Values').purge(from).length;
    }));
    return this;
}
