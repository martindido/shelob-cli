'use strict';

var Backbone = require('backbone-associations');
var socket = require('./socket');
var App = require('./views/app');

window.$ = Backbone.$ = require('jquery');
window.d3 = require('d3');
window.topojson = require('topojson');

require('../lib/datamaps.world');
require('../lib/date.format');

module.exports = new App();
