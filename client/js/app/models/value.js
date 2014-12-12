'use strict';

var Backbone = require('backbone-associations');

module.exports = Backbone.AssociatedModel.extend({
    parse: parse
});

function parse(value) {
    value.createdAt = new Date(value.createdAt);
    return value;
}
