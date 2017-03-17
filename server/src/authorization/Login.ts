import express = require("express");
import {readFile} from "../util/Utils"
import {base} from "../serverConfig/Globals";

import request = require("request");
var jwt = require('jsonwebtoken');

function getUserByLogin(login) {
    return readFile(base + '/data/users/userCredentials.json').then(function (data) {
        let l = data.length,
            i,
            user;
        for (i = 0; i < l; i++) {
            if (data[i].login === login) {
                user = data[i]
            }
        }
        return user;
    });
}

function checkCredentials(credentials) {
    let login = credentials.username,
        password = credentials.password,
        valid = true;
    return getUserByLogin(login).then(function (usr) {
        if (!usr) return !valid;
        if (password === usr.password) {
            return valid;
        } else {
            return !valid
        }
    });
}

function readUserConfig(login) {
    return readFile(base + '/data/users/' + login + '.json')
        .then(function (config) {
          return config;
        });
}



export function getContextConfig(req: express.Request, res: express.Response) {
    readUserConfig(req.body.login).then(function (config) {
        res.send(config);
    });

}

export function validUser(req: express.Request, res: express.Response) {
    checkCredentials(req.body).then(function (valid) {
        var user = req.body;
        if (valid) {
            readUserConfig(req.body.username).then(function (config) {
                    config['token'] = jwt.sign(user, 'shhhhhhhhhhhhh', {expiresIn: 60 * 60});
                    res.send(config);
            })
        } else {
            res.send("error");
        }
    });
}

export function auth(req: express.Request, res: express.Response, next: any) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, 'shhhhhhhhhhhhh', function (err, decoded) {
            if (err) {
                if (err.name == 'TokenExpiredError') {
                    return res.status(401).send({success: false, message: 'Failed to authenticate token.'});
                } else {
                    return res.json({success: false, message: 'Failed to authenticate token.'});
                }
            } else {
                // if everything is good, save to request for use in other routes
                req['decoded'] = decoded;
                next();
            }
        });
    } else {
        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
}