/*global module:false*/
module.exports = function(grunt) {
  "use strict";

  grunt.loadTasks("../tasks");

  grunt.initConfig({
    cssUrlRewrite: {
      dist: {
        src: "css/styles.css",
        dest: "css/output.css",

        options: {
          skipExternal: true,
          rewriteUrl: function(loc, opts, resp) {
            var path = loc.replace(opts.baseDir, '');
            var hash = require('crypto').createHash('md5').update(resp).digest('hex');
            return '/v-' + hash + '/' + path;
          }
        }
      }
    }
  });

  grunt.registerTask("default", ["cssUrlRewrite"]);
};
