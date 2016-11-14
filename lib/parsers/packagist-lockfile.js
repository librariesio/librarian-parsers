'use strict';

var packagistLockfile = function(str) {
  var json;
  try { json = JSON.parse(str); } catch(err) { return []; }

  var runtimeDeps = [];
  var devDeps = [];

  var deps = json.packages;
  if(deps) {
    runtimeDeps =  Object.keys(deps)
    .reduce(function(accum, dep) {
      accum.push({
        name: deps[dep].name,
        version: deps[dep].version,
        type: 'runtime'
      });
      return accum;
    }, []);
  }

  var deps = json['packages-dev'];
  if(deps) {
    devDeps = Object.keys(deps)
    .reduce(function(accum, dep) {
      accum.push({
        name: deps[dep].name,
        version: deps[dep].version,
        type: 'development'
      });
      return accum;
    }, []);
  }

  return runtimeDeps.concat(devDeps);
};

module.exports = packagistLockfile;
