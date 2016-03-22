'use strict';

var REGEXP = /^([a-zA-Z0-9]+[a-zA-Z0-9-_\.]+)([=|>|<]=(\d+(\.\d+)?(\.\d+)?))?/;

function parser(str) {
  var deps = str.split("\n").reduce( (accum, line) => {
    var match = line.match(REGEXP);

    if (!match) return accum;

    let name = match[1], version = match[3]

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
