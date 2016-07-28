'use strict';

var g2js = require('gradle-to-js/lib/parser');

var gradle = function(str) {
  return g2js.parseText(str).then(function(json) {
    if(json['dependencies'] && json['dependencies']['compile']){
      var deps = json['dependencies']['compile'];
    } else {
      return []
    }

    if (!Array.isArray(deps)) deps = [deps];
    return deps.reduce(function(accum, dep) {
      if (typeof dep !== 'string' || !dep.match(/[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+(\.[A-Za-z0-9_-])?\:[A-Za-z0-9_-]+\:/)) return accum;
      var parts = dep.split(':')
      var name = parts.slice(0, -1).join(':')
      var version = parts[parts.length -1]
      accum.push({
        name: name,
        version: version,
        type: 'runtime'
      });
      return accum;
    }, []);
  }).catch(function (err) {
    console.log(err)
    return [];
  });
};

module.exports = gradle;
