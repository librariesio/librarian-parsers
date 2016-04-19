'use strict';

var Promise = require("bluebird");
var xml2js = Promise.promisifyAll(require('xml2js'));

var nuspec = function(str) {
  return xml2js.parseStringAsync(str).then(function(json) {
    var deps = json.package.metadata[0].dependencies[0].dependency[0];

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

module.exports = nuspec;
