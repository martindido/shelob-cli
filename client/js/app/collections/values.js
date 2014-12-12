'use strict';

var _ = require('underscore');
var Backbone = require('backbone-associations');
var Value = require('../models/value');

module.exports = Backbone.Collection.extend({
    model: Value,
    initialize: initialize,
    clear: clear,
    getMax: getMax,
    getMin: getMin,
    getCounts: getCounts,
    purge: purge
});

function initialize() {
    this.clear();
    this.on('add', this.clear, this);
}

function clear() {
    this.max = 0;
    this.min = 0;
    this.counts = [];
}

function getMax() {
    this.max = this.max || (function max() {
        if (!this.length) {
            return 0;
        }
        return _.max(this.getCounts());
    }.bind(this))();
    return this.max;
}

function getMin() {
    this.min = this.min || (function min() {
        if (!this.length) {
            return 0;
        }
        return _.min(this.getCounts());
    }.bind(this))();
    return this.min;
}

function getCounts() {
    this.counts = this.counts.length ? this.counts : this.map(function each(value) {
        return value.get('count');
    });
    return this.counts;
}

function purge(from) {
    this.remove(this.filter(function each(value) {
        return value.get('createdAt') <= from;
    }));
    return this;
}
