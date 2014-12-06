'use strict';

var ejs = require('ejs');
var path = require('path');
var http = require('http');
var socketIo = require('socket.io');
var express = require('express');

module.exports = function appConfiguration(done) {
    var app = express();
    var server = http.Server(app);
    var config = require('./config');
    var routers = require('./routers');

    app.io = socketIo(server);
    app.io.on('connection', function onConnection(socket) {
        console.log('A user connected');
        socket.on('disconnect', function onDisconnet(){
            console.log('A user disconnected');
        });
    });

    app.disable('x-powered-by');
    app.use(express.static(__dirname + '/../public'));
    app.set('views', path.join(__dirname, '/views'));
    app.set('view engine', 'html');
    app.engine('html', ejs.renderFile);
    routers(app);

    done(app, server);
};
