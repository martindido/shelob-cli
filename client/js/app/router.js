'use strict';

var Backbone = require('backbone');
var HomeView = require('./views/home');

var Router = Backbone.Router.extend({
    routes: {
        '': 'home',
    },
    home: home
});

function home() {
    this.app.show(new HomeView());
}

module.exports = Router;
