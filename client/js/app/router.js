'use strict';

var Backbone = require('backbone');
var HomeView = require('./views/home');
var DashboardView = require('./views/dashboard');

module.exports = Backbone.Router.extend({
    routes: {
        '': 'home',
        'dashboard': 'dashboard'
    },
    home: home,
    dashboard: dashboard
});

function home() {
    this.app.show(new HomeView());
}

function dashboard() {
    this.app.show(new DashboardView());
}
