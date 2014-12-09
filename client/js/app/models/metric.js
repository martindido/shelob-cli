'use strict';

var Backbone = require('backbone');
var Values = require('../collections/values');

module.exports = Backbone.Model.extend({
    parse: parse
});

function parse(metric) {
    metric.Values = new Values(metric.Values || []);
    return metric;
}
