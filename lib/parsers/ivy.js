'use strict';

var Promise = require("bluebird");
var xml2js = Promise.promisifyAll(require('xml2js'));

var ivy = function(str) {
  return xml2js.parseStringAsync(str).then(function(json) {
    if(json['ivy-module'] && json['ivy-module']['dependencies']){
      var deps = json['ivy-module']['dependencies'][0]['dependency'];
    } else {
      return []
    }

    if (!Array.isArray(deps)) deps = [deps];
    return deps.reduce(function(accum, dep) {
      dep = dep['$']
      if (typeof dep === "undefined") return accum;
      accum.push({
        name: dep.org + ":" + dep.name,
        version: dep.rev,
        type: 'runtime'
      });
      return accum;
    }, []);
  }).catch(function (err) {
    return [];
  });
};

module.exports = ivy;
