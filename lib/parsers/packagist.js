'use strict';

var packagist = function(str) {
  var json;

  try { json = JSON.parse(str); }
  catch(e) { throw new Error('Invalid JSON'); }

  var deps = [];

  var runtimeDeps = json.require || [];
  var devDeps = json['require-dev'] || [];

  Object.keys(runtimeDeps).forEach( (dep) => {
    deps.push({
      name: dep,
      version: runtimeDeps[dep],
      type: 'runtime'
    });
  });

  Object.keys(devDeps).forEach( (dep) => {
    deps.push({
      name: dep,
      version: devDeps[dep],
      type: 'development'
    });

  });

  return deps;

};

module.exports = packagist;
