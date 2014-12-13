'use strict';

var Backbone = require('backbone-associations');

module.exports = Backbone.AssociatedModel.extend({
    defaults: defaults,
    parse: parse
});

function defaults() {
    return {
        createdAt: new Date()
    };
}

function parse(value) {
    if (!(value instanceof Date)) {
        value.createdAt = new Date(value.createdAt);
    }
    return value;
}
