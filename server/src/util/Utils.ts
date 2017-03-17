var Promise = require('promise');
var rFile = Promise.denodeify(require("fs").readFile);


export function readFile(path: string): any {
    return rFile(path).then(function (data) {
        return JSON.parse(data.toString());
    })
        .catch(function (err) {
            console.log(err);
            return null;
        });

}

