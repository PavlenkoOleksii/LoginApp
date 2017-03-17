var _ = require('lodash');
import express = require("express");
import utils = require("../util/Utils");
import {base} from "../serverConfig/Globals";
import {readFile} from "../util/Utils"

export function getDashboard(req: express.Request, res: express.Response) {
    readFile(base + '/data/databaseImitation/tableData.json')
        .then(function (config) {
            var response = config.tableData
            if(req.body.filter){
                var filteredValue = _.filter(config.tableData, function(val) {
                    for(var k in val){
                       if(req.body.filter.hasOwnProperty(k)){
                           if(val[k].toLowerCase().indexOf(req.body.filter[k].toLowerCase()) == -1) return false;
                       }
                    }
                    return true;
                });
                response = filteredValue
            }
            res.send(response)
        });



}

