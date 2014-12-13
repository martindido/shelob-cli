'use strict';

var _ = require('underscore');
var Backbone = require('backbone-associations');
var Values = require('../collections/values');
var Value = require('../models/value');

module.exports = Backbone.AssociatedModel.extend({
    idAttribute: 'key',
    relations: [{
        type: Backbone.Many,
        key: 'Values',
        collectionType: Values,
        relatedModel: Value
    }],
    parse: parse,
    total: total,
    addValues: addValues,
    getMax: getMax,
    getMin: getMin
});

function parse(value) {
    value.createdAt = new Date(value.createdAt);
    return value;
}

function total() {
    return _.reduce(this.get('Values').models, function each(total, value) {
        return total + value.get('count');
    }, 0, this);
}

function addValues(values) {
    this.get('Values').add(values.map(Value.prototype.parse));
}

function getMax() {
    return this.get('Values').getMax();
}

function getMin() {
    return this.get('Values').getMin();
}
