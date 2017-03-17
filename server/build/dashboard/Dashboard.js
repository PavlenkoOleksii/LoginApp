"use strict";
var _ = require('lodash');
var Globals_1 = require("../serverConfig/Globals");
var Utils_1 = require("../util/Utils");
function getDashboard(req, res) {
    Utils_1.readFile(Globals_1.base + '/data/databaseImitation/tableData.json')
        .then(function (config) {
        var response = config.tableData;
        if (req.body.filter) {
            var filteredValue = _.filter(config.tableData, function (val) {
                for (var k in val) {
                    if (req.body.filter.hasOwnProperty(k)) {
                        if (val[k].toLowerCase().indexOf(req.body.filter[k].toLowerCase()) == -1)
                            return false;
                    }
                }
                return true;
            });
            response = filteredValue;
        }
        res.send(response);
    });
}
exports.getDashboard = getDashboard;
