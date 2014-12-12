'use strict';

var _ = require('underscore');
var Backbone = require('backbone-associations');
var Value = require('../models/value');

module.exports = Backbone.Collection.extend({
    model: Value,
    max: max
});

function max() {
    return _.max(this.map(function each(value) {
        return value.get('count');
    }));
}
