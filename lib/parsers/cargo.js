'use strict';

var Toml = require("toml");

function parser(str) {
  var toml;

  try { toml = Toml.parse(str); }
  catch(e) { throw new Error('Invalid TOML'); }

  var deps = [];
  var runtimeDeps = toml.dependencies || [];

  Object.keys(runtimeDeps).forEach( (dep) => {
    var version = runtimeDeps[dep];
    if (typeof version === 'object') {
      if (!('version' in version)) {
        return;
      }
      version = version['version'];
    }
    deps.push({
      name: dep,
      version: version,
      type: 'runtime'
    });
  });

  return deps;
}

module.exports = parser;
