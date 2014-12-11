'use strict';

var Backbone = require('backbone-associations');

module.exports = Backbone.View.extend({
    id: 'home',
    tagName: 'section',
    render: render
});

function render() {
    this.$el.html('<a href="#dashboard"><img id="logo" src="/img/logo.jpg"><h1 id="title">SHELOB</h1></a>');
    return this;
}
