"use strict";
var Promise = require('promise');
var rFile = Promise.denodeify(require("fs").readFile);
function readFile(path) {
    return rFile(path).then(function (data) {
        return JSON.parse(data.toString());
    })
        .catch(function (err) {
        console.log(err);
        return null;
    });
}
exports.readFile = readFile;
