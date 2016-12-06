'use strict';

var rp = require('request-promise');

function parser(str) {
  var options = {
    uri :     'http://swift.libraries.io/to-json',
    method :  'POST',
    body:     str
  };

  return rp(options)
  .then( (res) => {
    var dependencies;

    try { dependencies = JSON.parse(res).dependencies; }
    catch(err) { return []; }
    return Object.keys(dependencies)
    .reduce(function(accum, pkg) {
      var dep = dependencies[pkg]

      var name = dep['url'].replace(/^https?:\/\//, '').replace(/\.git$/,'')
      var version = dep['version'].lowerBound + ' - ' + dep['version'].upperBound
      accum.push({
        name: name,
        version: version,
        type: 'runtime'
      });

      return accum;
    }, []);
  });
}

module.exports = parser;
