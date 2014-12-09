'use strict';

var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
    parse: parse
});

function parse(metric) {
    metric.values = metric.Metrics;
    delete metric.Metrics;
    return metric;
}
