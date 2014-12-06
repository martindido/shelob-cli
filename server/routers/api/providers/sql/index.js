'use strict';

var _ = require('underscore');
var Sequelize = require('sequelize');
var Models = require('./models');

function Sql(options) {
    options = options || {};
    this.name = options.name;
    this.username = options.username;
    this.password = options.password;
    this.options = options.options || {};
    this.start();
}

Sql.prototype.start = function start() {
    this.database = new Sequelize(this.name, this.username, this.password, this.options);
    this.models = new Models(this.database);
}

Sql.prototype.get = function get(options, callback) {
    this.models.key.findAll({
        where: options.where,
        include: this.models.metric
    }).then(callback);
}

Sql.prototype.getRandom = function getRandom(callback) {
    var now = Date.now();
    var metrics = {};

    _.range(10).forEach(function each(i) {
        metrics[now - i * 1000] = Math.floor((Math.random() * 25) + 1);
    });
    callback(null, metrics);
}

module.exports = Sql;
