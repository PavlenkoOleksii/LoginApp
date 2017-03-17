"use strict";
var Utils_1 = require("../util/Utils");
var Globals_1 = require("../serverConfig/Globals");
var jwt = require('jsonwebtoken');
function getUserByLogin(login) {
    return Utils_1.readFile(Globals_1.base + '/data/users/userCredentials.json').then(function (data) {
        var l = data.length, i, user;
        for (i = 0; i < l; i++) {
            if (data[i].login === login) {
                user = data[i];
            }
        }
        return user;
    });
}
function checkCredentials(credentials) {
    var login = credentials.username, password = credentials.password, valid = true;
    return getUserByLogin(login).then(function (usr) {
        if (!usr)
            return !valid;
        if (password === usr.password) {
            return valid;
        }
        else {
            return !valid;
        }
    });
}
function readUserConfig(login) {
    return Utils_1.readFile(Globals_1.base + '/data/users/' + login + '.json')
        .then(function (config) {
        return config;
    });
}
function getContextConfig(req, res) {
    readUserConfig(req.body.login).then(function (config) {
        res.send(config);
    });
}
exports.getContextConfig = getContextConfig;
function validUser(req, res) {
    checkCredentials(req.body).then(function (valid) {
        var user = req.body;
        if (valid) {
            readUserConfig(req.body.username).then(function (config) {
                config['token'] = jwt.sign(user, 'shhhhhhhhhhhhh', { expiresIn: 60 * 60 });
                res.send(config);
            });
        }
        else {
            res.send("error");
        }
    });
}
exports.validUser = validUser;
function auth(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, 'shhhhhhhhhhhhh', function (err, decoded) {
            if (err) {
                if (err.name == 'TokenExpiredError') {
                    return res.status(401).send({ success: false, message: 'Failed to authenticate token.' });
                }
                else {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                }
            }
            else {
                req['decoded'] = decoded;
                next();
            }
        });
    }
    else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
}
exports.auth = auth;
