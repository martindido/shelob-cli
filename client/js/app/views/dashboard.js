'use strict';

var Backbone = require('backbone-associations');
var charts = require('./charts');

module.exports = Backbone.View.extend({
    id: 'dashboard',
    tagName: 'section',
    initialize: initialize,
    render: render
});

function initialize() {
    this.chart = new charts.Map();
}

function render() {
    var $dashboard = $('<a href="#"><img id="logo" src="/img/logo.jpg"><h1 id="title">SHELOB</h1></a>');

    this.$el.html($dashboard).append(this.chart.$el);
    return this;
}
