'use strict';

var packagistLockfile = function(str) {
  var json;
  try { json = JSON.parse(str); } catch(err) { return []; }
  var deps = json.packages;
  if(!deps) return [[]];
  return Object.keys(deps)
  .reduce(function(accum, dep) {
    accum.push({
      name: deps[dep].name,
      version: deps[dep].version,
      type: 'runtime'
    });
    return accum;
  }, []);
};

module.exports = packagistLockfile;
