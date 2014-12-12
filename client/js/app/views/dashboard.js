'use strict';

var d3 = require('d3');
var Backbone = require('backbone-associations');
var Metrics = require('../collections/metrics');
var Chart = require('./chart');

module.exports = Backbone.View.extend({
    id: 'dashboard',
    tagName: 'section',
    initialize: initialize,
    render: render,
    addChart: addChart
});

function initialize() {
    this.charts = {};
    this.from = new Date();
    this.from.setMinutes(this.from.getMinutes() - 60);
    this.to = new Date();
    this.collection = new Metrics();
    this.collection.fetch({
        data: {
            from: this.from,
            to: this.to
        }
    });
    this.collection.on('add', this.addChart, this);
}

function addChart(metric) {
    this.charts[metric.get('key')] = new Chart({
        model: metric,
        from: this.from
    });

    var keys = Object.keys(this.charts).sort();
    var index = keys.indexOf(metric.get('key'));
    var verb = 'after';

    if (keys.length === 1) {
        return this.$el.append(this.charts[metric.get('key')].render().$el);
    }
    if (!index) {
        verb = 'before';
        index++;
    }
    else {
        index--;
    }
    this.$('#' + keys[index].replace(/\./g, '-'))[verb](this.charts[metric.get('key')].render().$el);
}

function render() {
    var $dashboard = $('<a href="#"><img id="logo" src="/img/logo.jpg"><h1 id="title">SHELOB</h1></a>');

    this.$el.html($dashboard);
    return this;
}
