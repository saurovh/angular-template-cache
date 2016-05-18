/*
 * grunt-template-cache
 * https://github.com/fisherman/template-cache
 *
 * Copyright (c) 2016 Fisherman
 * Licensed under the MIT license.
 */

'use strict';
var util = require('util');

var minify = require('html-minifier').minify;
   

   function escapeString(str){
      var str;
        str = str.replace(/\\/g, "\\\\")
                 .replace(/\n\s+?/g, " ")
                 .replace(/\s{2,}/g, " ")
                 .replace(/'/g, "\\'");
      return str;
   }


module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('grunt-angular-template-cache', 'angular directive template are placed in index files for cache', function() {
      var options = this.options({
      startTag: '<!--TEMPLATE_START-->',
      endTag: '<!--TEMPLATE_END-->',
      fileTmpl: '<script type="text/ng-template" id="%s">%s</script>',//first is name // last is content
      appRoot: '',
      relative: false
    });


    // Iterate over all specified file groups.
    this.files.forEach(function (f) {
      var scripts,
        page = '',
        newPage = '',
        start = -1,
        end = -1;

      // Create string tags
      scripts = f.src.filter(function (filepath) {
          // Warn on and remove invalid source files (if nonull was set).
          if (!grunt.file.exists(filepath)) {
            grunt.log.warn('Source file "' + filepath + '" not found.');
            return false;
          } else { return true; }
        }).map(function (filepath) {
          filepath = filepath.replace(options.appRoot, '');
          // If "relative" option is set, remove initial forward slash from file path
          if (options.relative) {
            filepath = filepath.replace(/^\//,'');
          }
          filepath = (options.prefix||'') + filepath;
          if (options.fileRef) {
            return options.fileRef(filepath);
          } else {
            var idname = filepath.slice(filepath.lastIndexOf('/')+1);
            var template,minified;
              try {
                template = grunt.file.read(filepath);
                 minified = escapeString(minify(template, {
                  preventAttributesEscaping: true,
                  collapseWhitespace: true,
                  removeComments: true
                }));
              }catch(e){
                console.log("template not found");
                minified = "Grunt Error code not read file"
              }



            return util.format(options.fileTmpl,options.fullName ? filepath : idname,minified);
          }
        });

      grunt.file.expand({}, f.dest).forEach(function(dest){
        page = grunt.file.read(dest);
        start = page.indexOf(options.startTag);
        end = page.indexOf(options.endTag, start);

        if (start === -1 || end === -1 || start >= end) {
          return;
        } else {
          var padding ='';
          var ind = start - 1;
          while(/[^\S\n]/.test(page.charAt(ind))){
            padding += page.charAt(ind);
            ind -= 1;
          }
          console.log('padding length', padding.length);
          newPage = page.substr(0, start + options.startTag.length) + grunt.util.linefeed + padding + scripts.join(grunt.util.linefeed + padding) + grunt.util.linefeed + padding + page.substr(end);
          // Insert the scripts
          grunt.file.write(dest, newPage);
          grunt.log.writeln('File "' + dest + '" updated.');
        }
      });
    });
  });

};
