'use strict';

var Backbone = require('backbone');
var Value = require('../models/value');

module.exports = Backbone.Collection.extend({
    model: Value
});
