'use strict';

var INSTALL_REGEXP = /install_requires\s*=\s*\[([\s\S]*?)\]/
var REQUIRE_REGEXP = /([a-zA-Z0-9]+[a-zA-Z0-9-_\.]+)([><=\d\.,]+)?/;

function parser(str) {
  var match = str.match(INSTALL_REGEXP)
  if (!match) return [];

  var deps = match[1].replace(/',(\s)?'/, "\n").split("\n").reduce( (accum, line) => {
    var line = line.trim()

    if(line.match(/^#/)) return accum;

    var match = line.match(REQUIRE_REGEXP);

    if (!match) return accum;

    let name = match[1], version = match[2]

    accum.push({
      name: name,
      version: version || '*',
      type: 'runtime'
    });

    return accum;
  }, []);

  return deps;
}

module.exports = parser;
