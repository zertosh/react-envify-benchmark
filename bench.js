#!/usr/bin/env node

var browserify = require('browserify');

var transformName = process.argv[2];
if (!/^(envify|loose-envify)$/.test(transformName)) {
  console.log('Usage:  node bench.js envify|loose-envify');
  process.exit(1);
}

var start = Date.now();

browserify({
  entries: __dirname + '/src/index.js',
  packageFilter: function(pkg, dir) {
    if (pkg.name === 'react' || pkg.name === 'fbjs') {
      pkg.browserify = {transform: [transformName]};
    }
    return pkg;
  }
}).bundle(function(err, src) {
  if (err) throw err;
  console.log('%sms', Date.now() - start);
});
