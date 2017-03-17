"use strict";
var express = require("express");
var bodyParser = require("body-parser");
var login = require('./authorization/Login');
var dashboard = require('./dashboard/Dashboard');
var server = express();
server.use(bodyParser.json({ limit: '50mb' }));
server.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
server.use(bodyParser.json());
server.use("/", express.static(__dirname + './../../public'));
server.set('view engine', 'ejs');
server.engine('html', require('ejs').renderFile);
var PORT = 4000;
server.get('/', function (req, res) {
    res.render('index.html');
});
server.post('/getContextConfig', login.getContextConfig);
server.post('/authenticate', login.validUser);
server.post('/dashboard', login.auth, dashboard.getDashboard);
server.listen(PORT, function () {
    console.log('Listening on localhost:' + PORT);
});
