'use strict'
var yarn = require('yarn/lib/lockfile/wrapper.js')

var yarnlock = function (str) {
  var dependencies = yarn.parse(str)
  var deps = []
  Object.keys(dependencies).forEach((dep) => {
    deps.push({
      name: dep.split('@')[0],
      version: dependencies[dep].version,
      type: 'runtime'
    })
  })
  return deps
}

module.exports = yarnlock
