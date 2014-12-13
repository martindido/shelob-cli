'use strict';

var Backbone = require('backbone-associations');
var utils = require('../../../../../shared/utils');
var Value = require('../../models/value');

module.exports = Backbone.View.extend({
    className: 'chart',
    initialize: initialize,
    clear: clear,
    render: render,
    time: time,
    svg: svg,
    metrics: metrics,
    line: line,
    x: x,
    y: y,
    axisX: axisX,
    axisY: axisY,
    scaleX: scaleX,
    scaleY: scaleY,
    parseDate: parseDate,
    color: color
});

function initialize(options) {
    this.d3 = {};
    this.collection.on('add', this.clear, this);
    this.collection.on('add', this.render, this);
    this.collection.on('add:Values', this.purge, this);
    this.collection.on('add:Values', this.render, this);
    this.to = options.to || new Date();
    this.from = options.from || utils.getDefaultFrom();
}

function clear() {
    delete this.d3.color;
}

function render(model) {
    var svg = this.svg();

    if (model instanceof Value) {
        this.time();
    }
    svg.selectAll('.axis.x')
        .call(this.axisX());
    svg.selectAll('.axis.y')
        .call(this.axisY());
    this.metrics();
    return this;
}

function time() {
    var to = this.to;
    var from = this.from;
    var diff = this.to.getTime() - this.from.getTime();

    this.to = new Date();
    this.from = new Date(this.to.getTime() - diff);
    this.collection.purge(this.from);
}

function svg() {
    this.d3.svg = this.d3.svg || (function svg() {
        var svg = d3.select(this.el)
            .append('svg')
                .attr('width', window.innerWidth - 100)
                .attr('height', 500)
                .append('g')
                    .attr('transform', 'translate(50,50)');
        svg.append('g')
                .attr('class', 'x axis')
                .attr('transform', 'translate(0,400)')
                .call(this.axisX());
        svg.append('g')
            .attr('class', 'y axis')
            .call(this.axisY())
            .append('text')
                .attr('transform', 'rotate(-90)')
                .attr('y', 6)
                .attr('dy', '.71em')
                .style('text-anchor', 'end')
                .text('Values');
        return svg;
    }.bind(this))();
    return this.d3.svg;
}

function metrics() {
    var color = this.color();
    var metrics = this.d3.svg.selectAll('.metric')
        .data(this.collection.models);
    var metric = metrics.enter()
        .append('g')
            .attr('class', 'metric');

    metric.append('path')
        .attr('class', 'line')
        .style('stroke', function stroke(metric) {
            return color(metric.get('key'));
        });
    metric.append('text')
        .attr('x', 3)
        .attr('dy', '.35em')
        .text(function text(metric) {
            return metric.get('key');
        });
    metrics.selectAll('path')
        .attr('d', function line(metric) {
            return this.line()(metric.get('Values').models);
        }.bind(this));
    metrics.selectAll('text')
        .attr('transform', function transform(metric) {
            var value = metric.get('Values').last();

            return "translate(" + this.x(value) + "," + this.y(value) + ")";
        }.bind(this));
}

function line() {
    return d3.svg.line()
        .interpolate('basis')
        .x(this.x.bind(this))
        .y(this.y.bind(this));
}

function x(value) {
    return this.scaleX()(this.parseDate(value.get('createdAt')));
}

function y(value) {
    return this.scaleY()(value.get('count'));
}

function axisX() {
    return d3.svg.axis()
        .scale(this.scaleX())
        .orient('bottom');
}

function axisY() {
    return d3.svg.axis()
        .scale(this.scaleY())
        .orient('left');
}

function scaleX() {
    return d3.time.scale()
        .range([0, window.innerWidth - 200])
        .domain([this.from, this.to]);
}

function scaleY() {
    return d3.scale.linear()
        .range([400, 0])
        .domain([this.collection.getMin(), this.collection.getMax() || 100]);
}

function parseDate(date) {
    if (!date.format) {
        console.log(date);
    }
    return d3.time.format('%d-%b-%y %H:%M:%S').parse(date.format('j-M-y H:i:s'));
}

function color() {
    this.d3.color = this.d3.color || d3.scale.category10()
        .domain(this.collection.getKeys());
    return this.d3.color;
}
