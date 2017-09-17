'use strict';
var express = require('express');
var app = express();
var server = require("http").createServer(app);
var events = require('./src/events');
var Ifttt = require('./src/ifttt');

var jetstream = require('jetstream-microservice');

var port = process.env.PORT || 8101;

var options = {
    name: "ifttt-webhooks",
    location: process.env.serviceLocation || "http://localhost:" + (process.env.PORT || port),
    registry_url: process.env.regUrl,
    jwt_secret: process.env.JWTSecret,
    amqpHost: process.env.amqpHost
}

jetstream.init(app, options);

var ifttt = new Ifttt({ webhookKey: process.env.IFTTT_WEBHOOK_KEY })

events.registerEvents(jetstream.events, ifttt);

server.listen(port);