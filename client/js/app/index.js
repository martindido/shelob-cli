'use strict';

var Backbone = require('backbone-associations');
var socket = require('./socket');
var App = require('./views/app');

require('../lib/date.format');

window.$ = Backbone.$ = require('jquery');

module.exports = new App();
