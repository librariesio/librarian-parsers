'use strict';

var control = require("readcontrol");

var REQUIRE_REGEXP = /([a-zA-Z0-9-_\.]+)\s?\(?([><=\s\d\.,]+)?\)?/

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function parser(str) {
  var config;

  try { config = control.parse(str); }
  catch(e) { throw new Error('Invalid config'); }

  var deps = [];
  var depends = ([].concat.apply([], Array(config.depends))[0] || '').replaceAll('\n', '').split(',');
  var imports = ([].concat.apply([], Array(config.imports))[0] || '').replaceAll('\n', '').split(',');
  var suggests = ([].concat.apply([], Array(config.suggests))[0] || '').replaceAll('\n', '').split(',');
  var enhances = ([].concat.apply([], Array(config.enhances))[0] || '').replaceAll('\n', '').split(',');

  Object.keys(depends).forEach( (dep) => {
    var line = depends[dep].trim()

    var match = line.match(REQUIRE_REGEXP);

    if (!match) return accum;

    let name = match[1], version = match[2]

    deps.push({
      name: name,
      version: version || '*',
      type: 'depends'
    });
  });

  Object.keys(imports).forEach( (dep) => {
    var line = imports[dep].trim()

    var match = line.match(REQUIRE_REGEXP);

    if (!match) return accum;

    let name = match[1], version = match[2]

    deps.push({
      name: name,
      version: version || '*',
      type: 'imports'
    });
  });

  Object.keys(suggests).forEach( (dep) => {
    var line = suggests[dep].trim()

    var match = line.match(REQUIRE_REGEXP);

    if (!match) return accum;

    let name = match[1], version = match[2]

    deps.push({
      name: name,
      version: version || '*',
      type: 'suggests'
    });
  });

  return deps;
}

module.exports = parser;
