'use strict';

var Backbone = require('backbone');

var HomeView = Backbone.View.extend({
    id: 'home',
    tagName: 'section',
    render: render
});

function render() {
    this.$el.html('<img id="logo" src="/img/logo.jpg"><h1 id="title">SHELOB</h1>');
    return this;
}

module.exports = HomeView;
