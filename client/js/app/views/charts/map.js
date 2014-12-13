'use strict';

var _ = require('underscore');
var Backbone = require('backbone-associations');
var Metrics = require('../../collections/metrics');
var utils = require('../../../../../shared/utils');
var rDot = /\./g;
var rWild = /\*/g;
var rCountry = /\{country\}/g;

module.exports = Backbone.View.extend({
    className: 'chart map',
    initialize: initialize,
    addMetric: addMetric,
    country: country,
    update: update,
    transition: transition,
    setMap: setMap,
    setDomain: setDomain,
    setColor: setColor,
    count: count,
    setCount: setCount,
    block: block,
    unblock: unblock
});

function initialize() {
    this.countries = {};
    this.setMap();
    this.key = 'server*.{country}.test.foo';
    this.rKey = new RegExp(this.key.replace(rDot, '\\.').replace(rWild, '.*').replace(rCountry, '([a-z]{3})'));
    this.collection = new Metrics();
    this.collection.fetch({
        data: {
            key: this.key
        }
    });
    this.collection.on('get', this.addMetric, this);
    this.collection.on('add', this.country, this);
    this.collection.on('add:Values', this.update, this);
}

function addMetric(metric) {
    var model = this.collection.get(metric.key);

    if (model) {
        return model.get('Values').add({
            count: metric.value
        });
    }
    model = this.collection.add({
        key: metric.key
    });
    model.get('Values').add({
        count: metric.value
    });
}

function country(metric) {
    var match = this.rKey.exec(metric.get('key'));

    if (!match) {
        console.log('no', metric);
    }
    var country = match[1].toUpperCase();

    metric.set('country', country);
    this.countries[country] = {
        blocked: false,
        min: 0,
        max: 0,
        count: 0
    };
}

function setMap() {
    this.width = window.innerWidth - 400;
    this.colors = {
        min: 'black',
        max: 'red'
    };
    this.d3 = {};
    this.map = new Datamap({
        element: this.el,
        width: this.width,
        height: this.width / 2.25,
        geographyConfig: {
            popupOnHover: false,
            highlightOnHover: false
        },
        fills: {
            defaultFill: this.colors.min
        }
    });
    this.d3.map = d3.select(this.el).selectAll('.datamap');
}

function update(value) {
    var country = value.collection.parents[0].get('country');

    this.setCount(country, value.get('count'));
    this.setColor(country);
    this.transition(country);
    value.collection.remove(value);
}

function transition(country) {
    var count = this.count(country);

    if (!count) {
        return;
    }
    this.block(country);
    this.d3.map.selectAll('.' + country)
        .transition()
            .duration(500)
            .style('fill', this.countries[country].color(count))
        .transition()
            .delay(500)
            .duration(1000)
            .style('fill', this.colors.min)
            .each('end', function () {
                this.unblock(country);
                this.transition(country);
            }.bind(this));
}

function setColor(country) {
    this.countries[country].color = this.countries[country].color || d3.scale.linear()
        .domain([this.countries[country].min, this.countries[country].max])
        .range([this.colors.min, this.colors.max]);
}

function setCount(country, count) {
    this.countries[country].count += count;
    this.setDomain(country, this.countries[country].count);
}

function setDomain(country, count) {
    if (count < this.countries[country].min) {
        this.countries[country].min = count;
        delete this.countries[country].color;
    }
    if (count > this.countries[country].max) {
        this.countries[country].max = count;
        delete this.countries[country].color;
    }
}

function count(country) {
    var count = this.countries[country].count;

    if (this.countries[country].blocked) {
        return 0;
    }
    this.countries[country].count = 0;
    return count;
}

function block(country) {
    this.countries[country].blocked = true;
}

function unblock(country) {
    this.countries[country].blocked = false;
}
