'use strict';

var Backbone = require('backbone');
var Metrics = require('../collections/metrics');

module.exports = Backbone.View.extend({
    id: 'dashboard',
    tagName: 'section',
    initialize: initialize,
    render: render,
    addMetric: addMetric
});

function initialize() {
    this.$metrics = $('<ul id="metrics"></ul>');
    this.collection = new Metrics();
    this.collection.fetch();
    this.collection.on('add', this.addMetric, this);
}

function render() {
    var $dashboard = $('<a href="#"><img id="logo" src="/img/logo.jpg"><h1 id="title">SHELOB</h1></a>');

    this.$el.html($dashboard).append(this.$metrics);
    return this;
}

function addMetric(metric) {
    var $metrics = this.$metrics;
    var $metric = $('<li class="metric">' + metric.get('name') + '</li>');
    var $values = $('<ul class="values"></ul>');

    metric.get('values').forEach(function each(value) {
        $values.append('<li class="value">' + value.createdAt + ': ' + value.value + '</li>');
    });
    $metrics.append($metric).append($values);
}
