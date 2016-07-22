'use strict';

var REGEXP = /\s+(.+?\S+)\s\((\d+\.\d+[\.\d+[\.\d+]*]*)\)/;

function parser(str) {
  var deps = str.split("\n").reduce( (accum, line) => {
    var match = line.match(REGEXP);

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
