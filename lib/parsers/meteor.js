'use strict';

var meteor = function(str) {
  var deps = JSON.parse(str).dependencies;
  return deps
  .reduce(function(accum, dep) {
    accum.push({
      name: dep[0],
      version: dep[1],
      type: 'runtime'
    });
    return accum;
  }, []);
};

module.exports = meteor;
