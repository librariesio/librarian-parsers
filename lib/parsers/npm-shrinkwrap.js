'use strict';

var npm = function(str) {
  var json;

  try { json = JSON.parse(str); }
  catch(e) { throw new Error('Invalid JSON'); }

  return pushDeps(json.dependencies);
};

function pushDeps(dependencies) {
  var deps = []
  Object.keys(dependencies).forEach( (dep) => {
    deps.push({
      name: dep,
      version: dependencies[dep].version,
      type: 'runtime'
    });
    var nested_deps = dependencies[dep].dependencies || {}
    if(Object.keys(nested_deps).length > 0){
      pushDeps(nested_deps).forEach(function(dep){ deps.push(dep)})
    };
  });

  return deps;
};

module.exports = npm;
