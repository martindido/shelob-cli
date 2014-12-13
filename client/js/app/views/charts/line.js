'use strict';

var Backbone = require('backbone-associations');
var utils = require('../../../../../shared/utils');

module.exports = Backbone.View.extend({
    id: id,
    className: 'chart',
    initialize: initialize,
    render: render,
    svg: svg,
    line: line,
    x: x,
    y: y,
    axisX: axisX,
    axisY: axisY,
    scaleX: scaleX,
    scaleY: scaleY,
    parseDate: parseDate
});

function id() {
    return this.model.get('key').replace(/\./g, '-');
}

function initialize(options) {
    this.d3 = {};
    this.model.on('add:Values', this.render, this);
    this.to = options.to || new Date();
    this.from = options.from || utils.getDefaultFrom();
}

function render() {
    var svg = this.svg();
    var to = this.to;
    var from = this.from;
    var diff = this.to.getTime() - this.from.getTime();

    this.to = new Date();
    this.from = new Date(this.to.getTime() - diff);
    svg.selectAll('.axis.x')
        .call(this.axisX());
    svg.selectAll('.axis.y')
        .call(this.axisY());
    svg.selectAll('path')
        .datum(this.model.get('Values').models)
        .attr('d', this.line());
    return this;
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
                .text(this.model.get('key'));
        svg.append('path')
            .attr('class', 'line');
        return svg;
    }.bind(this))();
    return this.d3.svg;
}

function line() {
    return d3.svg.line()
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
        .domain(d3.extent(this.model.get('Values').models, function each(value) {
            return value.get('count');
        }));
}

function parseDate(date) {
    return d3.time.format('%d-%b-%y %H:%M:%S').parse(date.format('j-M-y H:i:s'));
}
