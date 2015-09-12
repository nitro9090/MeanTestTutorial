var _ = require('lodash'),
        glob = require('glob');

/** 
 * requies 
 * @type @exp;_@call;extendall app configuration data
 */
module.exports = _.extend(
        require('./env/all.js'),
        require('./env/' + process.env.NODE_ENV + '.js') || {}
);

/**
 * Get files by glob patterns
 */
module.exports.getGlobbedFiles = function (globPatterns, excludes) {
     // For context switching
     var _this = this;

     // URL paths regex
     var urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');

     // The output array
     var output = [];

  // If glob pattern is array then we use each pattern in a recursive way, otherwise we use glob
  if (_.isArray(globPatterns)) {
    globPatterns.forEach(function (globPattern) {
      output = _.union(output, getGlobbedPaths(globPattern, excludes));
    });
  } else if (_.isString(globPatterns)) {
    if (urlRegex.test(globPatterns)) {
      output.push(globPatterns);
    } else {
      var files = glob.sync(globPatterns);
      if (excludes) {
        files = files.map(function (file) {
          if (_.isArray(excludes)) {
            for (var i in excludes) {
              file = file.replace(excludes[i], '');
            }
          } else {
            file = file.replace(excludes, '');
          }
          return file;
        });
      }
      output = _.union(output, files);
    }
  }

  return output;
};

/**
 * Get the modules JavaScript files
 */
module.exports.getJavaScriptAssets = function (includeTests) {
     var output = this.getGlobbedFiles(this.assets.lib.js.concat(this.assets.js), 'public/');

     // To include tests
     if (includeTests) {
          output = _.union(output, this.getGlobbedFiles(this.assets.tests));
     }

     return output;
};

/**
 * Get the modules CSS files
 */
module.exports.getCSSAssets = function () {
     var output = this.getGlobbedFiles(this.assets.lib.css.concat(this.assets.css), 'public/');
     return output;
};