'use strict';

var dgram = require('dgram');
var EventEmitter = require('events').EventEmitter;

module.exports = Udp;

function Udp(options) {
    options = options || {};
    this.host = options.host;
    this.port = options.port;
    this.emitter = new EventEmitter();
    this.start();
}

Udp.prototype.start = function start() {
    this.socket = dgram.createSocket('udp4');
    this.socket.on('listening', this.onListening.bind(this));
    this.socket.on('close', this.onClose.bind(this));
    this.socket.on('error', this.onError.bind(this));
    this.socket.on('message', this.onMessage.bind(this));
    this.socket.bind(this.port, this.host);
};

Udp.prototype.onListening = function onListening() {
    console.log('socket listening ' + this.host + ':' + this.port);
};

Udp.prototype.onClose = function onClose() {
    console.log('socket closed ' + this.host + ':' + this.port);
    this.start();
};

Udp.prototype.onError = function onError(err) {
    console.log('socket error ' + this.host + ':' + this.port + ' - ' + err);
};

Udp.prototype.onMessage = function onMessage(messages, remote) {
    var metrics = [];
    var now = new Date();

    messages.toString().split('\n').forEach(function onEach(message) {
        var metric = {
            createdAt: now,
            Metrics: []
        };

        message = message.split(' ');
        if (!message[0]) {
            return;
        }
        metric.name = message[0];
        metric.Metrics.push({
            createdAt: now,
            value: parseInt(message[1])
        });
        metrics.push(metric);
    });
    this.emit('get', metrics)
};

Udp.prototype.on = function on() {
    this.emitter.on.apply(this, arguments);
};

Udp.prototype.emit = function emit() {
    this.emitter.emit.apply(this, arguments);
};
