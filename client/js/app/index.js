'use strict';

var Backbone = require('backbone');
var socket = require('./socket');
var App = require('./views/app');

window.$ = Backbone.$ = require('jquery');

module.exports = new App();
