#!/usr/bin/env node

var crypto = require('crypto');
var browserify = require('browserify');

var shas = [];

['envify', 'loose-envify'].forEach(function(transformName) {
  browserify({
    entries: __dirname + '/src/index.js',
    packageFilter: function(pkg, dir) {
      if (pkg.name === 'react' || pkg.name === 'fbjs') {
        pkg.browserify = {transform: [transformName]};
      }
      return pkg;
    }
  })
  .bundle()
  .pipe(crypto.createHash('sha1'))
  .on('data', function(out) {
    var sha = out.toString('hex');
    console.log('%s - %s', sha, transformName)
    shas.push(sha);
    done();
  });
});

function done() {
  if (shas.length !== 2) return;
  if (shas[0] !== shas[1]) {
    process.exit(1);
  }
}
