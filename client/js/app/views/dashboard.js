'use strict';

var d3 = require('d3');
var Backbone = require('backbone-associations');
var Metrics = require('../collections/metrics');
var charts = require('./charts');

module.exports = Backbone.View.extend({
    id: 'dashboard',
    tagName: 'section',
    initialize: initialize,
    render: render
});

function initialize() {
    this.from = new Date();
    this.from.setMinutes(this.from.getMinutes() - 50);
    this.to = new Date();
    this.collection = new Metrics();
    this.chart = new charts.Lines({
        collection: this.collection,
        from: this.from,
        to: this.to
    });
    this.collection.fetch({
        data: {
            key: 'server10*.test.foo',
            from: this.from,
            to: this.to
        }
    });
}

function render() {
    var $dashboard = $('<a href="#"><img id="logo" src="/img/logo.jpg"><h1 id="title">SHELOB</h1></a>');

    this.$el.html($dashboard).append(this.chart.$el);
    return this;
}
