'use strict';

var Promise = require("bluebird");
var xml2js = Promise.promisifyAll(require('xml2js'));

var readProp = function(json, prop) {
  if(prop && String(prop).match(/^\$\{(.+)\}/)){
    return json.project.properties[0][String(prop).match(/^\$\{(.+)\}/)[1]][0]
  } else {
    return prop
  }
}

var maven = function(str) {
  return xml2js.parseStringAsync(str).then(function(json) {
    if(json.project && json.project.dependencies){
      var deps = json.project.dependencies[0].dependency;
    } else {
      var deps = []
    }
    if (!Array.isArray(deps)) deps = [deps];
    if(json.project.dependencyManagement && json.project.dependencyManagement.dependencies){
      deps = deps.concat(json.project.dependencyManagement.dependencies[0].dependency)
    }
    return deps.reduce(function(accum, dep) {
      if (typeof dep === "undefined") return accum;
      accum.push({
        name: readProp(json, dep.groupId) + ":" + readProp(json, dep.artifactId),
        version: readProp(json, dep.version) || '*',
        type: readProp(json, dep.scope) || 'runtime'
      });
      return accum;
    }, []);

  }).catch(function (err) {
    return [];
  });
};

module.exports = maven;
