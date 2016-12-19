'use strict';

var REGEXP =  /^(.+)\s+(.+)$/

function parser(str) {
  var deps = str.replace(/(\#(.*))/g, '').split("\n").reduce( (accum, line) => {
    var match = line.match(REGEXP);

    if (!match) return accum;

    let name = match[1].trim(), version = match[2].trim()

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
