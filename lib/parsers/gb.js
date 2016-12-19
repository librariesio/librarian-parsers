'use strict';

function parser(str) {
  var json;

  try { json = JSON.parse(str); }
  catch(e) { throw new Error('Invalid JSON'); }

  var deps = [];
  var runtimeDeps = json.dependencies || [];

  Object.keys(runtimeDeps).forEach( (dep) => {
    deps.push({
      name: runtimeDeps[dep].importpath,
      version: runtimeDeps[dep].revision,
      type: 'runtime'
    });
  });

  return deps;
}

module.exports = parser;
