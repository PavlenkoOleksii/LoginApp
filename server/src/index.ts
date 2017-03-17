/// <reference path="../declarations/node.d.ts" />
/// <reference path="../declarations/express.d.ts" />
/// <reference path="../declarations/body-parser.d.ts" />
/// <reference path="../declarations/request.d.ts" />
/// <reference path="../declarations/es6-promise.d.ts" />

import http = require('http');
import express = require("express");
import bodyParser = require("body-parser");
import login = require('./authorization/Login')
import dashboard = require('./dashboard/Dashboard')
var server = express();
server.use(bodyParser.json({limit: '50mb'}));
// used to parse JSON object given in the request body
server.use(bodyParser.urlencoded({extended: false, limit: '50mb'}));
server.use(bodyParser.json());
server.use("/", express.static(__dirname + './../../public'));
server.set('view engine', 'ejs');
server.engine('html', require('ejs').renderFile);

var PORT : number = 4000;

server.get('/', function (req : express.Request, res : express.Response) {
    res.render('index.html');
});

server.post('/getContextConfig', login.getContextConfig);

server.post('/authenticate', login.validUser);

server.post('/dashboard', login.auth, dashboard.getDashboard);



server.listen(PORT, function () {
    console.log('Listening on localhost:' + PORT);
});