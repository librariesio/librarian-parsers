'use strict';

var Promise = require("bluebird");
var xml2js = Promise.promisifyAll(require('xml2js'));

var nuget = function(str) {
  return xml2js.parseStringAsync(str).then(function(json) {

    if(json.packages && json.packages.package){
      var deps = json.packages.package[0];
    } else {
      return []
    }

    if (!Array.isArray(deps)) deps = [deps];
    return deps.reduce(function(accum, dep) {
      dep = dep['$']
      if (typeof dep === "undefined") return accum;
      accum.push({
        name: dep.id,
        version: dep.version,
        type: 'runtime'
      });
      return accum;
    }, []);
  }).catch(function (err) {
    return [];
  });
};

module.exports = nuget;
